# Assets — attribution

## `city/` — fond de ville en ruine (scènes Survey/Decontam/EM)

**« Ruined City Background »** (OpenGameArt) — <https://opengameart.org/content/ruined-city-background>.
Licence **CC0**. Silhouettes multicouches (`sky.png`, `city_back.png`, `city_fore.png`)
câblées via `createRuinedCitySprites` dans `WorldArt.ts` (ciel + 2 couches de skyline
en parallaxe, teintées « contaminé »), en repli sur la ville procédurale si absentes.
Les plateformes-bâtiments (`drawBuildingSlab`) et la brume toxique restent procédurales.

## `creatures/` — feuilles de sprites des animaux (optionnelles)

**« LPC animals (2022, v1.1) »** (OpenGameArt) —
<https://opengameart.org/content/lpc-bears-deer-lions-and-more>.
Licence **CC-BY 4.0** (auteurs : bluecarrot16 et contributeurs LPC ; certaines pièces
de Sevarihk sont en CC0). Frames 64×64, format LPC.
Fichiers utilisés ici :
- `creatures/bear/sheet.png` ← *bear, grizzly* (slot **bear**).
- `creatures/wolf/sheet.png` ← *fox, woods* (slot **wolf** = prédateur de forêt).
- `creatures/boar/sheet.png` ← *lion* (slot **boar** = gros fonceur).

Câblé par `systems/combat/enemies/CreatureSprites.ts` (voir `creatures/README.md`).
Les autres animaux (boar, hunter, woodpecker, skunk) restent **procéduraux** tant
qu'aucune feuille n'est déposée.

> Le perso (rig FK), les PNJ, les décors désert/village et l'UI restent **procéduraux**
> (dessinés au runtime via `Graphics`).
