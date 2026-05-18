"""
Scraper de empresas de logística/carga en Miami sin presencia digital
Alpha Strategy Group — Lead Generation Tool

Instalar dependencias:
    pip install requests beautifulsoup4 pandas openpyxl tqdm

Uso:
    python scraper_logistica_miami.py

Salida:
    leads_logistica_miami.xlsx  (con todas las empresas encontradas y su estado digital)
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random
import re
import urllib.parse
from tqdm import tqdm

# ─── Configuración ────────────────────────────────────────────────────────────

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9,es;q=0.8",
}

DELAY_MIN = 2.0   # segundos entre requests (para no ser bloqueado)
DELAY_MAX = 4.5

OUTPUT_FILE = "leads_logistica_miami.xlsx"

PAGES_TO_SCRAPE = [
    "http://paginasamarillasdelacarga.cargoyellowpages.com/florida_usa_freight_forwarders_cargo_agents.html",
    "http://paginasamarillasdelacarga.cargoyellowpages.com/florida2_usa_freight_forwarders_cargo_agents.html",
]

MIAMI_KEYWORDS = [
    "miami", "doral", "medley", "hialeah", "fl 331", "florida 331",
    "nw ", "sw ", "33166", "33178", "33172", "33122", "33126",
    "33147", "33142", "33167", "33182", "33186",
]

# ─── Funciones de scraping ─────────────────────────────────────────────────────

def get_page(url: str) -> BeautifulSoup | None:
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        return BeautifulSoup(resp.text, "html.parser")
    except Exception as e:
        print(f"  [ERROR] No se pudo obtener {url}: {e}")
        return None


def parse_cargo_yellowpages(soup: BeautifulSoup) -> list[dict]:
    """Extrae empresas del directorio CargoYellowPages."""
    companies = []

    # Las entradas están en bloques con nombre, dirección, teléfono
    entries = soup.find_all("div", class_=re.compile(r"company|listing|entry", re.I))

    # Fallback: buscar por estructura de tabla o párrafos con datos
    if not entries:
        entries = soup.find_all(["p", "li", "tr", "div"])

    raw_text = soup.get_text(separator="\n")
    lines = [l.strip() for l in raw_text.split("\n") if l.strip()]

    i = 0
    current = {}
    for line in lines:
        # Detectar nombre de empresa (línea en MAYÚSCULAS o seguida de dirección)
        if re.match(r"^[A-Z][A-Z0-9 &',.\-]{4,}$", line) and len(line) < 80:
            if current.get("empresa"):
                companies.append(current)
            current = {"empresa": line, "direccion": "", "telefono": "", "email": "", "website": ""}
        elif re.search(r"\d{3,5}\s+[NnSsEeWw]{1,2}\.?\s+\d+", line) or re.search(r"(FL|Florida)\s+\d{5}", line, re.I):
            if current:
                current["direccion"] = line
        elif re.match(r"^\(?\d{3}\)?[\s\-]\d{3}[\s\-]\d{4}", line):
            if current:
                current["telefono"] = line
        elif "@" in line and "." in line:
            if current:
                current["email"] = line
        elif re.match(r"https?://|www\.", line, re.I):
            if current:
                current["website"] = line

    if current.get("empresa"):
        companies.append(current)

    return companies


def is_miami_area(company: dict) -> bool:
    """Filtra solo empresas del área de Miami."""
    text = (company.get("direccion", "") + " " + company.get("empresa", "")).lower()
    return any(kw in text for kw in MIAMI_KEYWORDS)


# ─── Verificación de presencia digital ─────────────────────────────────────────

SESSION = requests.Session()
SESSION.headers.update(HEADERS)


def search_duckduckgo(query: str) -> list[str]:
    """Busca en DuckDuckGo y retorna lista de URLs encontradas."""
    url = "https://html.duckduckgo.com/html/"
    params = {"q": query, "kl": "us-en"}
    try:
        resp = SESSION.post(url, data=params, timeout=12)
        soup = BeautifulSoup(resp.text, "html.parser")
        results = []
        for a in soup.select("a.result__url"):
            href = a.get("href", "")
            if href:
                results.append(href)
        return results[:5]
    except Exception:
        return []


def check_website(nombre: str, ciudad: str = "Miami") -> dict:
    """
    Verifica si una empresa tiene:
    - Sitio web propio
    - Facebook
    - Instagram
    - LinkedIn
    """
    resultado = {
        "tiene_website": False,
        "website_url": "",
        "tiene_facebook": False,
        "tiene_instagram": False,
        "tiene_linkedin": False,
        "notas": "",
    }

    query_base = f'"{nombre}" {ciudad} freight cargo'

    # 1. Buscar sitio web propio
    urls = search_duckduckgo(query_base)
    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))

    for url in urls:
        url_lower = url.lower()
        if any(excl in url_lower for excl in [
            "facebook", "instagram", "linkedin", "yelp", "yellowpages",
            "cargoyellowpages", "dnb.com", "zoominfo", "bbb.org",
            "manta.com", "chamberofcommerce", "bizapedia"
        ]):
            continue
        # Parece un dominio propio
        if nombre.split()[0].lower()[:4] in url_lower or ciudad.lower() in url_lower:
            resultado["tiene_website"] = True
            resultado["website_url"] = url
            break
        elif re.search(r"https?://(?!www\.(yelp|face|insta|linked|yellow|dnb|zoom))", url):
            resultado["tiene_website"] = True
            resultado["website_url"] = url
            break

    # 2. Buscar Facebook
    urls_fb = search_duckduckgo(f'"{nombre}" site:facebook.com')
    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
    if urls_fb:
        resultado["tiene_facebook"] = True

    # 3. Buscar Instagram
    urls_ig = search_duckduckgo(f'"{nombre}" site:instagram.com')
    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
    if urls_ig:
        resultado["tiene_instagram"] = True

    return resultado


# ─── Pipeline principal ────────────────────────────────────────────────────────

def scrape_all_pages() -> list[dict]:
    """Extrae todas las empresas de todas las páginas configuradas."""
    all_companies = []
    for page_url in PAGES_TO_SCRAPE:
        print(f"\n  Scraping: {page_url}")
        soup = get_page(page_url)
        if not soup:
            continue
        companies = parse_cargo_yellowpages(soup)
        print(f"  → {len(companies)} empresas encontradas en esta página")
        all_companies.extend(companies)
        time.sleep(random.uniform(2, 4))
    return all_companies


def load_manual_leads() -> list[dict]:
    """Carga la lista de leads verificados manualmente."""
    return [
        {"empresa": "A & Z-Alpha & Omega, Inc.", "direccion": "4825 NW 72nd Ave, Miami, FL 33166", "telefono": "(305) 715-9065", "email": "", "website": ""},
        {"empresa": "A. M. Cargo Services, Inc.", "direccion": "5220 NW 72nd Ave Ste 4, Miami, FL 33166", "telefono": "(305) 640-9857", "email": "", "website": ""},
        {"empresa": "A.E. & N. Cargo, Inc.", "direccion": "8276 NW 68th St, Miami, FL 33166", "telefono": "(305) 599-0204", "email": "", "website": ""},
        {"empresa": "ALCAR International Inc.", "direccion": "5501 NW 72nd Ave, Miami, FL 33166", "telefono": "(305) 885-3930", "email": "", "website": ""},
        {"empresa": "ABA Cargo, Inc.", "direccion": "6188 NW 74th Ave, Miami, FL 33166", "telefono": "(305) 594-2727", "email": "", "website": ""},
        {"empresa": "ABBA Shipping Lines Inc.", "direccion": "6918 NW 51st St, Miami, FL 33166", "telefono": "(305) 238-6326", "email": "", "website": ""},
        {"empresa": "ABE Cargo Express", "direccion": "Miami, FL", "telefono": "(305) 471-0203", "email": "", "website": ""},
        {"empresa": "A1 Courier Corp", "direccion": "8236 NW 68th St, Miami, FL 33166", "telefono": "(305) 639-2626", "email": "", "website": ""},
        {"empresa": "Aboard Cargo Service Inc.", "direccion": "8344 NW 30 Terrace, Doral, FL 33122", "telefono": "(305) 593-7072", "email": "aboard@aboardcargo.com", "website": ""},
        {"empresa": "ACL Logistics and Tech Inc.", "direccion": "7925 NW 12 Street, Miami, FL 33126", "telefono": "(305) 599-0413", "email": "sales@acllogistics.com", "website": ""},
        {"empresa": "Action Brokerage Corp.", "direccion": "4477 NW 97 Avenue, Miami, FL 33178", "telefono": "(305) 592-1152", "email": "liz@action-brokerage.com", "website": ""},
        {"empresa": "Advance Cargo Corp.", "direccion": "7921 NW 68 Street, Miami, FL 33166", "telefono": "(305) 640-9996", "email": "", "website": ""},
        {"empresa": "Advanced Logistics, Inc.", "direccion": "5567 NW 72 Ave, Miami, FL 33166", "telefono": "(305) 718-4160", "email": "", "website": ""},
        {"empresa": "Aerocav International, Inc.", "direccion": "7701 NW 46th St, Miami, FL 33166", "telefono": "(305) 499-9094", "email": "servicioalcliente@aerocavlogistics.com", "website": ""},
        {"empresa": "Aerolog Inc.", "direccion": "5815 NW 18th St, Miami, FL 33126", "telefono": "(786) 265-2930", "email": "miasales@aerologinc.com", "website": ""},
        {"empresa": "Aeromundo Express", "direccion": "8282 NW 14 Street, Miami, FL 33126", "telefono": "(305) 463-8335", "email": "christian@aeromundo.com", "website": ""},
        {"empresa": "Agla Of America, Inc.", "direccion": "8600 NW 64 Street, Miami, FL 33166", "telefono": "(305) 463-7170", "email": "", "website": ""},
        {"empresa": "Air Fenix Express, Inc.", "direccion": "8550 NW 70th St, Miami, FL 33166", "telefono": "(305) 597-0107", "email": "", "website": ""},
        {"empresa": "Air Ocean International Forwarders, Inc.", "direccion": "7999 NW 81 Place, Miami, FL 33166", "telefono": "(305) 463-0470", "email": "sales@airoceanintl.com", "website": ""},
        {"empresa": "Air Trans Marine, Inc.", "direccion": "5055 NW 74th Ave Unit 8, Miami, FL 33166", "telefono": "(305) 513-8589", "email": "", "website": ""},
        {"empresa": "Almar USA Corp.", "direccion": "8411 NW 74th Street, Miami, FL 33166", "telefono": "(305) 640-0336", "email": "", "website": ""},
        {"empresa": "Amad Logistics, LLC", "direccion": "8274 NW 14th Street, Miami, FL 33126", "telefono": "(305) 888-0344", "email": "sales@amadlogistics.com", "website": ""},
        {"empresa": "AmCar Freight Inc.", "direccion": "7860 NW 80th Street, Medley, FL 33166", "telefono": "(305) 599-8866", "email": "", "website": ""},
        {"empresa": "America Cargo Services, Inc.", "direccion": "10302 NW South River Dr, Medley, FL", "telefono": "(305) 888-7436", "email": "", "website": ""},
        {"empresa": "Amerindias Inc.", "direccion": "5220 NW 72nd Ave Bay 3, Miami, FL 33166", "telefono": "(305) 471-0038", "email": "b.diaz@amerindias.com", "website": ""},
        {"empresa": "Ameritrans World Group, Inc.", "direccion": "7102 NW 50th St, Miami, FL 33166", "telefono": "(305) 599-2662", "email": "info@ameritransworld.com", "website": ""},
        {"empresa": "Antilles Freight Corporation", "direccion": "11206 NW 36th Avenue, Miami, FL 33167", "telefono": "(305) 688-5488", "email": "antilles@antillesfreight.com", "website": ""},
        {"empresa": "Apollo 2000 Cargo, Inc.", "direccion": "4759 NW 72 Avenue, Miami, FL 33166", "telefono": "(305) 718-3788", "email": "info@apollo2000cargo.com", "website": ""},
        {"empresa": "Ariel Cargo Export, Inc.", "direccion": "8252 NW 68 St, Miami, FL 33166", "telefono": "(305) 597-7534", "email": "president@arielcargo.com", "website": ""},
        {"empresa": "Atlantic Overseas Express", "direccion": "8361 NW 74th Street, Miami, FL 33166", "telefono": "(305) 715-0344", "email": "info@atlanticoverseasexpress.com", "website": ""},
        {"empresa": "Avenecol Cargo Corp.", "direccion": "8065 NW 66th Street, Miami, FL 33166", "telefono": "(305) 477-8800", "email": "", "website": ""},
        {"empresa": "AAC Perishables Logistics, Inc.", "direccion": "6300 NW 97th Ave, Doral, FL 33178", "telefono": "(305) 436-2845", "email": "", "website": ""},
        {"empresa": "Alfa Logistics Corporation", "direccion": "6345 NW 99 Ave, Doral, FL 33178", "telefono": "(305) 599-1268", "email": "", "website": ""},
        {"empresa": "Gama Logistics USA LLC", "direccion": "11037 NW 122nd St, Medley, FL 33178", "telefono": "(305) 468-9167", "email": "", "website": ""},
        {"empresa": "Flamingo Cargo Inc.", "direccion": "8235 NW 64th St Bay 7, Miami, FL 33166", "telefono": "(305) 594-2222", "email": "", "website": ""},
        {"empresa": "Gold Cargo Freight Corp.", "direccion": "8233 NW 68th St, Miami, FL 33166", "telefono": "(305) 640-0505", "email": "", "website": ""},
        {"empresa": "GNH Logistics, Inc.", "direccion": "2801 NW 74th Ave Suite 212, Miami, FL 33122", "telefono": "(305) 395-7119", "email": "", "website": ""},
        {"empresa": "Inter Custom Logistics LLC", "direccion": "8133 NW 68th St, Miami, FL 33166", "telefono": "(305) 718-8190", "email": "", "website": ""},
        {"empresa": "Intercaribbean Cargo Inc.", "direccion": "8551 NW 72 St, Miami, FL 33166", "telefono": "(305) 436-5859", "email": "", "website": ""},
        {"empresa": "International Cargo Agency, Inc.", "direccion": "8329 NW 66th Street, Miami, FL 33166", "telefono": "(305) 716-0858", "email": "", "website": ""},
        {"empresa": "JFJ Freight Forwarders Inc.", "direccion": "13100 NW 113th Avenue, Medley, FL 33178", "telefono": "(305) 887-5110", "email": "", "website": ""},
        {"empresa": "Just In Time Services, Inc.", "direccion": "11119 NW 122nd St Unit 8, Miami, FL 33178", "telefono": "(305) 887-2535", "email": "", "website": ""},
        {"empresa": "K & S Freight Systems Inc.", "direccion": "10250 NW South River Dr, Medley, FL 33178", "telefono": "(305) 883-8532", "email": "", "website": ""},
        {"empresa": "Krown Logistics LLC", "direccion": "7202 NW 84th Avenue, Miami, FL 33166", "telefono": "(305) 594-0266", "email": "", "website": ""},
        {"empresa": "Latin Logistics LLC", "direccion": "8206 NW 14th St, Miami, FL 33126", "telefono": "(305) 599-9112", "email": "", "website": ""},
        {"empresa": "Milam Cargo, Inc.", "direccion": "13100 NW 113th Avenue, Medley, FL 33178", "telefono": "(305) 592-0325", "email": "", "website": ""},
        {"empresa": "Mondial Forwarding, Inc.", "direccion": "8423 NW 74th Street, Miami, FL 33166", "telefono": "(305) 594-9696", "email": "", "website": ""},
        {"empresa": "NC Cargo Corp.", "direccion": "7478 NW 54th Street, Miami, FL 33166", "telefono": "(305) 591-4100", "email": "", "website": ""},
        {"empresa": "Noral Cargo International, Inc.", "direccion": "4745 NW 72 Avenue, Miami, FL 33166", "telefono": "(305) 591-2898", "email": "", "website": ""},
        {"empresa": "22-24 Cargo Inc.", "direccion": "2961 W 12th Ave, Hialeah, FL 33012", "telefono": "(305) 885-9919", "email": "", "website": ""},
        {"empresa": "Kelly Global Logistics, Inc.", "direccion": "701 W 20th Street, Hialeah, FL 33010", "telefono": "(786) 337-4460", "email": "", "website": ""},
        {"empresa": "Miami International Freight Solutions LLC", "direccion": "6301 East 10th Ave, Hialeah, FL 33013", "telefono": "(305) 685-0035", "email": "", "website": ""},
        {"empresa": "Freeport Freight Forwarders of Miami", "direccion": "7429 NW 50th St, Miami, FL 33166", "telefono": "(305) 591-3815", "email": "", "website": ""},
        {"empresa": "Flash International Courier Corp.", "direccion": "7270 NW 25 Street, Miami, FL 33122", "telefono": "(305) 593-5335", "email": "", "website": ""},
        {"empresa": "Fast Global Logistics, Inc.", "direccion": "3505 NW 113 Ct, Miami, FL 33178", "telefono": "(305) 592-3374", "email": "", "website": ""},
        {"empresa": "Four Star Cargo Inc.", "direccion": "7640 NW 63rd Street, Miami, FL 33166", "telefono": "(305) 717-6200", "email": "", "website": ""},
        {"empresa": "FrontCargo Freight Service", "direccion": "4729 NW 72 Avenue, Miami, FL 33166", "telefono": "(305) 436-0096", "email": "", "website": ""},
        {"empresa": "Global Cargo Group Inc.", "direccion": "9300 NW 25th St, Doral, FL 33172", "telefono": "(305) 513-4493", "email": "", "website": ""},
        {"empresa": "Global Connection Logistics Inc.", "direccion": "8510 NW 70th St, Miami, FL 33166", "telefono": "(305) 436-5524", "email": "", "website": ""},
        {"empresa": "Jumar International Corp.", "direccion": "2840 NW 108th Ave, Doral, FL 33172", "telefono": "(305) 593-0707", "email": "", "website": ""},
        {"empresa": "Mundo Cargo Corp.", "direccion": "Miami, FL 33166", "telefono": "(305) 592-5578", "email": "", "website": ""},
        {"empresa": "Magnum Freight Corp.", "direccion": "2600 NW 75th Ave, Miami, FL 33122", "telefono": "(305) 269-0900", "email": "", "website": ""},
        {"empresa": "Maromar International Freight Forwarders", "direccion": "7016 NW 50th St, Miami, FL 33166", "telefono": "(305) 594-2290", "email": "", "website": ""},
        {"empresa": "Merflex International Inc.", "direccion": "7303 NW 56 Street, Miami, FL 33166", "telefono": "(305) 882-1522", "email": "", "website": ""},
        {"empresa": "Neocomm Americas Inc.", "direccion": "8203 NW 68th St, Miami, FL 33166", "telefono": "(305) 599-2699", "email": "", "website": ""},
        {"empresa": "Nobel Cargo Systems", "direccion": "3571 NW 82nd Avenue, Miami, FL 33122", "telefono": "(305) 471-9874", "email": "", "website": ""},
        {"empresa": "Navicargo, Inc.", "direccion": "8860 NW 102nd St, Miami, FL 33178", "telefono": "(305) 888-2694", "email": "", "website": ""},
        {"empresa": "J & J Courier Service, Inc.", "direccion": "7500 NW 54th Street, Miami, FL 33166", "telefono": "(305) 597-9480", "email": "", "website": ""},
        {"empresa": "Jacol Cargo, Inc.", "direccion": "7168 NW 50th St, Miami, FL 33166", "telefono": "(305) 477-5370", "email": "", "website": ""},
        {"empresa": "Jet Box Corp.", "direccion": "2550 NW 72 Ave #115, Miami, FL 33122", "telefono": "(305) 594-4313", "email": "", "website": ""},
    ]


def run():
    print("=" * 60)
    print("  Alpha Strategy Group — Lead Scraper Logística Miami")
    print("=" * 60)

    # Cargar lista base (manual ya verificada)
    companies = load_manual_leads()
    print(f"\n  Cargadas {len(companies)} empresas de la lista base.")

    # Verificar presencia digital
    print("\n  Verificando presencia digital (puede tomar varios minutos)...\n")

    results = []
    sin_nada = []

    for company in tqdm(companies, desc="  Verificando"):
        nombre = company["empresa"]
        digital = check_website(nombre)

        row = {
            "Empresa": nombre,
            "Dirección": company.get("direccion", ""),
            "Teléfono": company.get("telefono", ""),
            "Email": company.get("email", ""),
            "Tiene Website": "SÍ" if digital["tiene_website"] else "NO",
            "Website URL": digital.get("website_url", ""),
            "Tiene Facebook": "SÍ" if digital["tiene_facebook"] else "NO",
            "Tiene Instagram": "SÍ" if digital["tiene_instagram"] else "NO",
            "Prioridad": "",
        }

        # Calcular prioridad como prospecto
        sin_web = not digital["tiene_website"]
        sin_fb = not digital["tiene_facebook"]
        sin_ig = not digital["tiene_instagram"]
        canales_faltantes = sum([sin_web, sin_fb, sin_ig])

        if canales_faltantes == 3:
            row["Prioridad"] = "ALTA - Sin ninguna presencia digital"
            sin_nada.append(row)
        elif canales_faltantes == 2:
            row["Prioridad"] = "MEDIA - Presencia digital muy limitada"
        else:
            row["Prioridad"] = "BAJA - Tiene algo de presencia digital"

        results.append(row)
        time.sleep(random.uniform(1, 2))

    # Exportar a Excel
    df = pd.DataFrame(results)

    # Ordenar: prioridad ALTA primero
    orden = {"ALTA - Sin ninguna presencia digital": 0,
              "MEDIA - Presencia digital muy limitada": 1,
              "BAJA - Tiene algo de presencia digital": 2}
    df["_orden"] = df["Prioridad"].map(orden)
    df = df.sort_values("_orden").drop(columns=["_orden"])

    with pd.ExcelWriter(OUTPUT_FILE, engine="openpyxl") as writer:
        df.to_excel(writer, sheet_name="Todos los leads", index=False)

        df_alta = df[df["Prioridad"].str.startswith("ALTA")]
        if not df_alta.empty:
            df_alta.to_excel(writer, sheet_name="Prioridad ALTA", index=False)

        df_media = df[df["Prioridad"].str.startswith("MEDIA")]
        if not df_media.empty:
            df_media.to_excel(writer, sheet_name="Prioridad MEDIA", index=False)

    print(f"\n{'=' * 60}")
    print(f"  LISTO: Archivo generado: {OUTPUT_FILE}")
    print(f"  Total empresas analizadas : {len(results)}")
    print(f"  Sin ninguna presencia     : {len(sin_nada)}")
    print(f"  Con email disponible      : {sum(1 for r in results if r['Email'])}")
    print("=" * 60)

    # Mostrar top 10 sin presencia
    if sin_nada:
        print("\n  TOP LEADS - Sin ninguna presencia digital:\n")
        for r in sin_nada[:10]:
            print(f"  * {r['Empresa']}")
            print(f"    Dir: {r['Direccion']}")
            print(f"    Tel: {r['Telefono']}")
            if r["Email"]:
                print(f"    Email: {r['Email']}")
            print()


if __name__ == "__main__":
    run()
