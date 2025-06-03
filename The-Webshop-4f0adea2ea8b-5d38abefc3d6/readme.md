# EPFE Mealprepping 2025

Mijn eindproject is gebaseerd op een online webshop waar je kant-en-klare maaltijden kan bestellen. 

Dit project bestaat uit: mealprepping webshop met een unieke uitstraling.
De opbouw van het project bestaat uit: mainpage, shoppingcart-page & admin-page.

## Features

- Klantaccount systeem: Klanten kunnen een account aanmake en inloggen (buiten werking)

- Producten: Keuze uit verschillende maaltijden die in de winkelmand gedaan kan worden.

- Betalingssysteem: Een veilige manier van betalen.

- Footercontact: Klanten kunnen contact opnemen via de footer onderin. (buiten werking)


## Vereisten

Om dit project te runnen heb je het volgende nodig:

- Localstorage
- Webserver (vercel)
- Een webbrowser

## Instalatie

#### Clone het project
```bash
git clone git@git.nexed.com:01919ca3-536f-753f-9f62-96f2a8bd4968/01919ca8-776d-70ae-9e84-8e4f19dbaa46/The-Webshop-4f0adea2ea8b-5d38abefc3d6.git
```
#### Navigaar naar de map
```bash
cd epfe-mealprepping
```
Start de webserver!

## Gebruik:

- Bestellen: Kies maaltijden uit en voeg ze toe aan de winkelmand

- Betalen: Klik op de bestelknop en bestel je producten!

## Hoe en waarom?

Eerst was ik begonnen met een kassa-systeem. Hier kwam ik alleen snel achter het feit dat dit wel mogelijk is, maar als ik dit echt goed en sirieus wil aanpakken kan ik dit beter bij een back-end project doen. Dus toen ben ik geswitched naar een webshop! 

```
Begonnen: 13 april 2025
Projectklaar: 24 april 2025
Updated: 25 april 2025
```

#### Mainpage:
Mainpage is gedaan in html en css. Alles wat werkt qua knoppen is gedaan via javascript en alle animaties is met css gedaan. Overal is een alert op toegevoegd. Bij het bestellen, contact zoeken of bij het proberen van het toevoegen van een combideal (niet op voorraad).

#### Admin & winkelmand:
Deze zijn beide functioneel en een duidelijk zicht op het aanpassen, wijzigen van aantal of toevoegen van producten.

Daarbij heeft de winkelmand een verwijder optie en een wijziging optie in aantal van een product. Ook is alles wat gereset word wat bestaand is in products.json word het ook opgeslagen in localstorage voor de gebruiker maar ook de admin.

Bij de admin page kan je  producten toevoegen, wijzigen of verwijderen.

#### JSON:
Alle producten komen uit een json bestand wat in een card gevuld d.m.v. innerHTML.
Het laden van de producten komt vanuit een js bestand zodat ook in de admin page de producten opgeslagen en herladen worden.

#### Footer:
Hier staat meer informatie in alleen de knoppen werken niet aangezien dit niet hoeftte. Wel staat er een copyright claim in en functioneren de knoppen in de footer niet.

## De online website
De online website kun je vinden op: https://epfe-mealprepping.vercel.app
De github is te vinden op: https://git.nexed.com/01919ca3-536f-753f-9f62-96f2a8bd4968/01919ca8-776d-70ae-9e84-8e4f19dbaa46/The-Webshop-4f0adea2ea8b-5d38abefc3d6.git

## Contributing

Wil jij een bijdrage leveren aan dit project? Stuur gerust een bericht of open een issue!
