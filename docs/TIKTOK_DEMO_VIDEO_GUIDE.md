# TikTok Developer Portal – Demo Video Guide

## Krav (sammanfattning)
- **Format:** MP4 eller MOV  
- **Storlek:** Max 5 filer, max 50 MB vardera  
- **Innehåll:** Minst en video som visar **hela flödet** från start till slut  
- **Webb:** Domänen i videon **måste** vara `https://hazzler.vercel.app`  
- **Sandbox:** Om appen inte är godkänd tidigare – använd sandbox-miljön i Developer Portal i videon  

---

## 1. Innan du spelar in

- Gå in i TikTok Developer Portal → din app → **Products** / **Scopes**.  
- Notera exakt vilka **produkter** och **scopes** du har valt (t.ex. Login Kit, Share Kit, Display API, Content Posting API).  
- **Ta bort** produkter/scopes du inte använder – annars måste de synas i videon, vilket kan försena granskningen.  
- Öppna din webbapp i webbläsaren på **https://hazzler.vercel.app** (så att URL:en syns i adressfältet under inspelningen).  

---

## 2. Vad videon ska visa (steg för steg)

### Öppning (5–10 sek)
- Visa **webbläsaren** med adressfältet så att `https://hazzler.vercel.app` tydligt syns.  
- Öppna eller ladda om sidan så att det är tydligt att det är din webbapp.  

### Huvudflöde (resten av videon)
- Gå igenom **hela användarflödet** för den TikTok-integration du söker godkänd:
  - **Login Kit:** Visa hur användaren loggar in med TikTok (knapp, redirect, vad som händer efter inloggning).  
  - **Share Kit:** Visa hur användaren delar till TikTok (välja innehåll, klicka dela, vad som händer i TikTok-appen eller i webbläsaren).  
  - **Display API:** Visa hur TikTok-innehåll visas på din sida (t.ex. videolista, spelare, profil).  
  - **Content Posting API:** Visa hur innehåll skapas/laddas upp och postas till TikTok.  
- Varje **produkt/scope du har valt** måste **tydligt** demonstreras med:
  - **Gränssnitt:** Knappar, menyer, sidor som användaren ser.  
  - **Interaktioner:** Klick, scroll, vad som händer efter varje steg.  
- Om du använder **sandbox:**  
  - Visa gärna kort att du är i sandbox (t.ex. att du testar via Developer Portal eller att testanvändare används), så att det framgår att det är demo-miljö.  

### Avslutning
- Visa gärna att flödet är **klart** (t.ex. “Post published”, “Logged in”, eller motsvarande meddelande på sidan).  

---

## 3. Tekniska tips för inspelning

- **Skärminspelning:** Använd t.ex. OBS, Windows Game Bar (Win + G), eller ett verktyg som sparar i MP4/MOV.  
- **Upplösning:** Minst 1280×720, helst 1920×1080 så att text och knappar är läsbara.  
- **Längd:** Räkna med 1–3 minuter för ett tydligt end-to-end-flöde. Korta, fokuserade klipp är bättre än långa.  
- **Ljud:** Inte nödvändigt för godkänd demo, men om du förklarar med röst – håll det kort och tydligt.  
- **Filstorlek:** Om filen blir större än 50 MB, sänk upplösning eller använd en komprimerad export (t.ex. H.264, lägre bitrate).  

---

## 4. Checklista innan du laddar upp

- [ ] URL i videon är **https://hazzler.vercel.app** (syns i webbläsaren).  
- [ ] Alla **valda produkter och scopes** i appen visas i videon.  
- [ ] **UI och användarinteraktioner** är tydligt synliga (knappar, klick, resultat).  
- [ ] Om appen inte är godkänd tidigare – **sandbox** används och det framgår (om det krävs).  
- [ ] Fil är **MP4 eller MOV** och under **50 MB**.  
- [ ] Du har **tagit bort** produkter/scopes du inte använder i Developer Portal (så att du inte behöver visa dem i videon).  

---

## 5. Om du inte har TikTok-integration på sajten än

Din webbapp (hazzler.vercel.app) har för närvarande bara en **länk till TikTok** i footern – ingen Login Kit, Share Kit eller API-anrop.

- Om du **söker godkänd** för Login Kit, Share Kit, Display API eller Content Posting API måste dessa **finnas implementerade** på sajten och **synas i videon**.  
- Om du **inte** ska använda dessa produkter – ta bort dem från appen i Developer Portal så att du inte behöver demonstrera dem.  
- Om du vill lägga till t.ex. “Log in with TikTok” eller “Share to TikTok” på hazzler.vercel.app kan vi bygga det steg för steg; säg bara vilken produkt du ska använda (Login Kit, Share Kit, etc.).  

---

*Uppdaterad för TikTok Developer Portal – demo video för webbapp.*
