# Project4

## Kjøre prosjektet

    cd frontend
    npm i
    npm start

Deretter velg hva slags simulator du vil bruke eller scan QR-koden med mobilen.

## Intro

Gruppen har valgt å lage en React Native App av prosjekt 3 (http://it2810-20.idi.ntnu.no/project3/ / https://gitlab.stud.idi.ntnu.no/it2810-h22/Team-20/project3 ). I dette prosjektet er det brukt samme backend og database som i prosjekt 3 slik at en bruker kan logge inn brukeren sin både på web siden og på appen.

## Innhold og funksjonalitet

**Søkemulighet og filtrering** \
På nettsiden er det mulig å søke på ulike filmer basert på tittel, skuespiller eller kategori. Resultatet kan sorteres basert på: gammel-ny, ny-gammel, popularitet og spilletid. Hva brukeren ønsker å søke etter defineres i en nedtrekksmeny over søkefeltet. Søket gjøres basert på hele datasettet ved hjelp av GraphQL queries i tjeneren.

**Listebasert presentasjon med paginering** \
I oversikten vises det 10 filmer på hver side. For å gå videre til neste side (dersom denne finnes) dukker det opp en knapp nederst på siden Next page som tar brukeren til neste side. På samme måte kan brukeren ta seg tilbake til forrige side ved å trykke på Previous page.
En annen løsning kunne vært å implementere uendelig scroll, hvor 10 og 10 elementer legges til listen hver gang brukeren er nederst på listen. Dette var noe gruppen ikke valgte å implementere for å kunne beholde backend logikken fra prosjekt 3.

**Brukergenererte data som lagres** \
I prosjekt 3 ble brukerens id lagret i Session Storage for å kunne legge til favorittfilmer til riktig bruker. React Native støtter ikke Session Storage og gruppen erstattet dette med AsyncStorage. AsyncStorage kan kun brukes til å lage små verdier, fordi det har noen begrensninger med lagring. Siden det i dette prosjektet kun er nødvendig å lagre små verdier fungerer AsyncStorage som en god erstatning, som støtter både iOS og Android.

**Bærekraftig utvikling** \
Bærekraftig utvikling handler om å ta valg som er energibesparende og igjen bidrar til mindre karbonutslipp. Gruppen har valgt å senke kvaliteten på bildene som vises fordi bilder står for en stor del av datatrafikken, samt bidrar til at tiden for innlasting av siden reduseres. Film står for mye datatrafikk og energibruk på klienten. På siden som viser info om en film har gruppen lagt inn traileren til filmen, men denne spilles ikke av automatisk, som er energibesparende og dermed bærekraftig. Ved søk etter filmer er det blitt benyttet en react-hook, useDebounce fra https://www.npmjs.com/package/use-debounce. Denne gjør at komponenten ikke sender en query til backend ved hver endring i søkefeltet, men at den venter med til søket er skrevet ferdig med å sende en query.

**Design** \
Designet er tilpasset en mobil og er derfor noe endret fra prosjekt 3, der nettisen var laget med utgangspunkt i å bli brukt på en pc. På en mobilskjerm er det ikke plass til like mye som en pc skjerm og det har vært viktig for gruppen at appen har et hensiktsmessig design som gir god oversikt for brukeren. Gruppen har derfor tenkt gjennom antall knapper som er brukt og minimert disse til et minimum. Headeren er også flyttet til bunnen, slik at det skal være lettere tilgjengelig for brukeren.

## Teknologi

**Frontend** \
Denne appen er utviklet i React Native med Typescript. Det er brukt Expo cli som gjør at utviklere kan lage React Native Apper som fungerer både for Android og iOS uten å måtte skrive native language. En forskjell på React og React Native er at i React Native så benyttes det ikke vanlig HTML og CSS. For å style i React Native lages det egne stylesheet som ligner på stylingen i CSS, men er noe ulik. På samme måte er det egne erstatninger for HTML. For eksempel er en <div> i HTML tilsvarende til <View> fra React Native.

**Backend** \
Til dette prosjektet er databasen og backenden fra prosjekt 3 gjenbrukt. Backenden er basert på graphQL og det er brukt en mongoDB database.

**Navigering i React Native** \
For å navigere mellom sider i React Native har gruppen brukt React-Navigation/native-stack.
Hele Appen er rendres inni en Navigation Container og en Stack.Navigator container. Stack er en konstant som defineres som createNativeStackNavigator<RootStackParamList>().
RootStackParamList er en egen fil (types) som er en liste over de forskjellige sidene i appen, som brukeren skal kunne navigere til. De ulike sidene blir lagt inn i App-filen ved bruk av <Stack.Screen>. Inni denne containeren defineres navnet på siden og hvilken komponent som blir brukt. For å navigere seg mellom sidene definerer man en type som inneholder navigation og route. Disse blir tatt inn som props i de ulike komponentene.

I prosjekt 3 hadde gruppen definert protectedRoutes som brukeren bare hadde tilgang til når den var innlogget. Gruppen så ikke samme behov ved å lage app, siden brukeren ikke kan navigere ved å endre på URL slik som i web. I dette prosjektet blir ikke brukeren navigert videre fra login siden uten å komme gjennom med riktig brukernavn og passord.

**Bruk av relevante komponenter og bibliotek** \
Måten komponentene blir stylet på i react native er ved å definere style som en view style prop også kalle den inn til der den skal brukes. Denne koden er svært likt slik som gruppen benyttet seg av styling av mui komponenter i prosjekt 3. Gruppen benyttet også https://reactnativeelements.com/docs/components/ for å hente komponenter som gjorde utviklingen raskere.

## Testing

**Brukertesting** \
Appen er brukertestet på iPhoner, simulerte iPhones og Android ved hjelp av xcode og Android Studio. I utviklingsprosessen har det blitt brukt simulerte iPhoner til å teste funksjonalitet. I sluttfasen har appen også blitt testet for Android og iPad.

Appen fungerer som ønsket begge både i iOS og Android, men en forskjell er at footeren flyttes over tastaturet når en bruker søker på filmer på Android. Gruppen ser ikke på dette som et problem, kun en forskjell. En annen forskjell gruppen opplevde var den første fonten gruppen benyttet seg av. Denne fungerte kun på iOS, og gruppen valgte derfor å bytte til de fontene som kommer automatisk fra start, fordi den tilfredsstille ønsket design på iOS og Android.

Gruppen har også fått andre studenter til å brukerteste appen for å få andre innspill og tilbakemeldinger.
