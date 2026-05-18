"""
Scraper de empresas de logistica/carga en Santa Cruz de la Sierra sin presencia digital
Alpha Strategy Group - Lead Generation Tool

Uso:
    python scraper_logistica_santacruz.py

Salida:
    leads_logistica_santacruz.xlsx
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random
import re
from tqdm import tqdm

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "es-BO,es;q=0.9,en;q=0.8",
}

DELAY_MIN = 2.0
DELAY_MAX = 4.5
OUTPUT_FILE = "leads_logistica_santacruz.xlsx"

SESSION = requests.Session()
SESSION.headers.update(HEADERS)


def search_duckduckgo(query: str) -> list:
    url = "https://html.duckduckgo.com/html/"
    params = {"q": query, "kl": "bo-es"}
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


def check_website(nombre: str, ciudad: str = "Santa Cruz Bolivia") -> dict:
    resultado = {
        "tiene_website": False,
        "website_url": "",
        "tiene_facebook": False,
        "tiene_instagram": False,
        "tiene_linkedin": False,
    }

    EXCLUIDOS = [
        "facebook", "instagram", "linkedin", "yelp", "yellowpages",
        "cargoyellowpages", "dnb.com", "zoominfo", "bbb.org",
        "boliviaentusmanos", "directoriodecarga", "nexdu.com",
        "boliviayp", "aduana.gob", "crdascz"
    ]

    # Buscar sitio web propio
    urls = search_duckduckgo(f'"{nombre}" {ciudad}')
    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))

    for url in urls:
        url_lower = url.lower()
        if any(excl in url_lower for excl in EXCLUIDOS):
            continue
        if re.search(r"https?://(?!www\.(yelp|face|insta|linked|yellow|dnb|zoom))", url):
            resultado["tiene_website"] = True
            resultado["website_url"] = url
            break

    # Buscar Facebook
    urls_fb = search_duckduckgo(f'"{nombre}" site:facebook.com')
    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
    if urls_fb:
        resultado["tiene_facebook"] = True

    # Buscar Instagram
    urls_ig = search_duckduckgo(f'"{nombre}" site:instagram.com')
    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))
    if urls_ig:
        resultado["tiene_instagram"] = True

    return resultado


def load_leads() -> list:
    return [
        # --- Agentes de Carga Internacional ---
        {"empresa": "ANDEX BOX CORP", "direccion": "Calle Miguel Roca No 42, Santa Cruz de la Sierra", "telefono": "+591 3 353-8988", "email": "", "sector": "Agente de Carga"},
        {"empresa": "GLOBAL VISION SERVICE SRL", "direccion": "Santa Cruz de la Sierra", "telefono": "+591 3 353-6195", "email": "globalvisionservice@bolivia.com", "sector": "Agente de Carga"},
        {"empresa": "TRINITY SRL", "direccion": "Av. Busch, Calle Santos Ortiz, Pasillo 23 de Septiembre No 15, Santa Cruz", "telefono": "+591 3 320-2381", "email": "", "sector": "Agente de Carga"},
        {"empresa": "PLUSCARGO BOLIVIA", "direccion": "Avda. Viedma No.800 PB, Santa Cruz", "telefono": "+591 3 339-1216", "email": "", "sector": "Agente de Carga"},
        {"empresa": "COTRAINCO COOP. DE TRANSPORTE INTERNACIONAL", "direccion": "4 Anillo Radial 27, 1 c/antes Av. Banzer, Santa Cruz", "telefono": "+591 344-2729", "email": "adm-miha@hotmail.com", "sector": "Agente de Carga"},
        {"empresa": "DELFIN GROUP BOLIVIA", "direccion": "Santa Cruz de la Sierra", "telefono": "", "email": "", "sector": "Agente de Carga"},
        {"empresa": "FERAL LOGISTICS SERVICES SRL", "direccion": "Santa Cruz de la Sierra", "telefono": "", "email": "", "sector": "Logistica"},
        {"empresa": "INBOLPACK SRL", "direccion": "Santa Cruz de la Sierra", "telefono": "", "email": "", "sector": "Agente de Carga"},
        {"empresa": "TRANS MEN CARGO", "direccion": "4to Anillo entre Av. Pirai y Radial 19 Nro. 4170, Santa Cruz", "telefono": "+591 73106096", "email": "", "sector": "Transporte Carga"},
        {"empresa": "ITALFREIGHT S.R.L.", "direccion": "C. Canada Strongest, Edif. Suto Of. L2-A, Santa Cruz", "telefono": "+591 3 333-6331", "email": "info@italfreight.bo", "sector": "Agente de Carga"},
        # --- Transporte de Carga Nacional/Internacional ---
        {"empresa": "VILLTRANS INTERNACIONAL", "direccion": "Av. Virgen de Cotoca, km 13, Santa Cruz", "telefono": "3550945 / +591 67896145", "email": "", "sector": "Transporte Carga"},
        {"empresa": "TRANS CGC", "direccion": "Av. Cambodromo entre 6to y 7mo anillo, Manzana 54 C. Ferroviario, Santa Cruz", "telefono": "+591 71654642", "email": "", "sector": "Transporte Carga"},
        {"empresa": "TRANSPORTADORA SANTA MONICA", "direccion": "Av. Tres Pasos al Frente, Tercer anillo externo, Santa Cruz", "telefono": "3625536 / +591 78340917", "email": "", "sector": "Transporte Carga"},
        {"empresa": "TRANSPORTES YAMIL", "direccion": "Tres pasos al frente, entre 3er. Anillo externo e interno, Santa Cruz", "telefono": "+591 79683179", "email": "", "sector": "Transporte Carga"},
        {"empresa": "SOLUCIONES DE LOGISTICA INTEGRAL SLI", "direccion": "C. Tatarenda Nro. 16, Barrio Urbari, Santa Cruz", "telefono": "3394514", "email": "", "sector": "Logistica"},
        {"empresa": "TRANS GLADIADOR SRL", "direccion": "Cuarto Anillo entre Av. Pirai y Radial 17.5, Edif. Humberto Gonzales PB, Santa Cruz", "telefono": "3554700 / +591 78180970", "email": "", "sector": "Transporte Carga"},
        {"empresa": "TRANS PANDO", "direccion": "Av. Carmelo Ortiz, Nro. 3555, Santa Cruz", "telefono": "+591 72925527", "email": "", "sector": "Transporte Carga"},
        {"empresa": "BLAZER BOLIVIA SRL", "direccion": "Av. San Antonio No 220, Barrio Espana, Zona La Pampa, Santa Cruz", "telefono": "3628913 / +591 70815088", "email": "", "sector": "Agente de Carga"},
        {"empresa": "CAR EXPRESS", "direccion": "Av. Marcelo Terceros Nro. 205, Santa Cruz", "telefono": "+591 77657727", "email": "", "sector": "Courier/Transporte"},
        {"empresa": "TRANS COPACABANA SA", "direccion": "Terminal Bimodal Santa Cruz", "telefono": "3625356 / +591 72849001", "email": "", "sector": "Transporte Carga"},
        # --- Logistica y Distribucion ---
        {"empresa": "IBAL CARGO", "direccion": "Calle Froilan Almaraz No. 15, Santa Cruz", "telefono": "", "email": "", "sector": "Agente de Carga"},
        {"empresa": "DAMARCRUZ SRL", "direccion": "Av. 6 De Agosto Nro 528 Casi 5to Anillo Barrio La Cuchilla, Santa Cruz", "telefono": "", "email": "", "sector": "Transporte Carga"},
        {"empresa": "DISTRIQUIM", "direccion": "4to. Anillo S/N, Parque Industrial Mz. 25, Santa Cruz", "telefono": "", "email": "", "sector": "Logistica"},
        {"empresa": "FG LOGISTICS SRL", "direccion": "Av. Irala No. 585, Ed. Irala, Piso 3, Of. 302, Santa Cruz", "telefono": "", "email": "", "sector": "Logistica/Aduanas"},
        {"empresa": "MARCA SERV", "direccion": "Av. Santos Dumont 4to. Anillo Calle Cesar Monasterio, Santa Cruz", "telefono": "", "email": "", "sector": "Logistica"},
        {"empresa": "SUCOTLINE LOGISTICS AND CONSULTING", "direccion": "Fernan Campos No. 3455 Barrio Conavi, Santa Cruz", "telefono": "", "email": "", "sector": "Logistica"},
        {"empresa": "COCECA LOGISTICA Y TRANSPORTES", "direccion": "Carret. A Puerto Suarez - Frontera Arroyo Concepcion, Santa Cruz", "telefono": "", "email": "", "sector": "Transporte Carga"},
        {"empresa": "SOLUCION LOGISTICA GLOBAL SRL", "direccion": "Cl. Buenos Aires No. 338, CC Los Arcos Ofic. 19, Santa Cruz", "telefono": "", "email": "", "sector": "Logistica"},
        {"empresa": "REDLINES FORWARDING SRL", "direccion": "Calle Cochabamba Esq. Saavedra Torres Cainco Piso 7 Of. 3, Santa Cruz", "telefono": "+591 3 330-0113", "email": "redlines@redlinesgroup.com", "sector": "Agente de Carga"},
        # --- Transporte Terrestre ---
        {"empresa": "L&C TRANSPORTE DE CARGA LOCAL Y NACIONAL", "direccion": "Paralela Radial 1, Santa Cruz", "telefono": "3519353 / 3519423", "email": "", "sector": "Transporte Carga"},
        {"empresa": "TRANSPORTES JOSE RIVERA SRL", "direccion": "Barrio Los Bosques, Santa Cruz", "telefono": "", "email": "", "sector": "Transporte Carga"},
        {"empresa": "TRANSPORTADORA TRINIDAD", "direccion": "Santa Cruz de la Sierra", "telefono": "", "email": "", "sector": "Transporte Carga"},
        {"empresa": "TRANSPORTES EL DORADO", "direccion": "Santa Cruz de la Sierra", "telefono": "", "email": "", "sector": "Transporte Carga"},
        {"empresa": "LINEA SINDICAL DE TRANSPORTES SAN FRANCISCO", "direccion": "Santa Cruz de la Sierra", "telefono": "", "email": "", "sector": "Transporte Carga"},
        {"empresa": "PROTRANS TRANSPORTE INTERNACIONAL", "direccion": "C. Choreti esq. Villamontes, Barrio Braniff - Zona Santos Dumont, Santa Cruz", "telefono": "+591 75328787", "email": "", "sector": "Transporte Carga"},
        {"empresa": "TRANSPORTADORA JIMENEZ", "direccion": "4to Anillo entre Santos Dumont y Radial 13, C. #7 No. 29, Santa Cruz", "telefono": "3573200", "email": "", "sector": "Transporte Carga"},
        {"empresa": "TRANSPORTES LUPJANSA", "direccion": "Av. Tres Pasos al Frente No. 3300, Santa Cruz", "telefono": "", "email": "", "sector": "Transporte Carga"},
        # --- Aduanas/Despachantes ---
        {"empresa": "COTRAINCO COOPERATIVA TRANSPORTE INTL", "direccion": "4to Anillo Radial 27, Santa Cruz", "telefono": "344-2729", "email": "", "sector": "Aduanas"},
        {"empresa": "MERSUR AGENCIA DESPACHANTE DE ADUANAS", "direccion": "Santa Cruz de la Sierra", "telefono": "", "email": "", "sector": "Aduanas"},
        {"empresa": "GGC BOLIVIA DESPACHO ADUANERO", "direccion": "Santa Cruz de la Sierra", "telefono": "", "email": "", "sector": "Aduanas"},
        # --- Courier ---
        {"empresa": "ANDEX BOX CORP COURIER", "direccion": "Calle Miguel Roca No 42, Santa Cruz", "telefono": "+591 3 353-8988", "email": "", "sector": "Courier"},
        {"empresa": "PLATINIUM ENCOMIENDAS", "direccion": "Terminal de Buses, Of. A-30, Sector Internacional, Santa Cruz", "telefono": "+591 69300194", "email": "", "sector": "Courier"},
        {"empresa": "AUTOBUSES QUIRQUINCHO", "direccion": "Terminal Bi Modal, Area Internacional, Caseta A-32, Santa Cruz", "telefono": "3643531 / +591 77511714", "email": "", "sector": "Courier"},
    ]


def run():
    print("=" * 60)
    print("  Alpha Strategy Group - Leads Logistica Santa Cruz, Bolivia")
    print("=" * 60)

    companies = load_leads()

    # Deduplicar por nombre
    seen = set()
    unique = []
    for c in companies:
        if c["empresa"] not in seen:
            seen.add(c["empresa"])
            unique.append(c)
    companies = unique

    print(f"\n  Cargadas {len(companies)} empresas de la lista base.")
    print("\n  Verificando presencia digital...\n")

    results = []
    sin_nada = []

    for company in tqdm(companies, desc="  Verificando"):
        nombre = company["empresa"]
        digital = check_website(nombre)

        sin_web = not digital["tiene_website"]
        sin_fb = not digital["tiene_facebook"]
        sin_ig = not digital["tiene_instagram"]
        canales_faltantes = sum([sin_web, sin_fb, sin_ig])

        if canales_faltantes == 3:
            prioridad = "ALTA - Sin ninguna presencia digital"
        elif canales_faltantes == 2:
            prioridad = "MEDIA - Presencia digital muy limitada"
        else:
            prioridad = "BAJA - Tiene algo de presencia digital"

        row = {
            "Empresa": nombre,
            "Sector": company.get("sector", ""),
            "Direccion": company.get("direccion", ""),
            "Telefono": company.get("telefono", ""),
            "Email": company.get("email", ""),
            "Tiene Website": "SI" if digital["tiene_website"] else "NO",
            "Website URL": digital.get("website_url", ""),
            "Tiene Facebook": "SI" if digital["tiene_facebook"] else "NO",
            "Tiene Instagram": "SI" if digital["tiene_instagram"] else "NO",
            "Prioridad": prioridad,
        }

        if canales_faltantes == 3:
            sin_nada.append(row)

        results.append(row)
        time.sleep(random.uniform(1, 2))

    # Exportar Excel
    df = pd.DataFrame(results)
    orden = {
        "ALTA - Sin ninguna presencia digital": 0,
        "MEDIA - Presencia digital muy limitada": 1,
        "BAJA - Tiene algo de presencia digital": 2,
    }
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

    if sin_nada:
        print("\n  TOP LEADS - Sin ninguna presencia digital:\n")
        for r in sin_nada[:10]:
            print(f"  * {r['Empresa']} ({r['Sector']})")
            print(f"    Dir: {r['Direccion']}")
            if r["Telefono"]:
                print(f"    Tel: {r['Telefono']}")
            if r["Email"]:
                print(f"    Email: {r['Email']}")
            print()


if __name__ == "__main__":
    run()
