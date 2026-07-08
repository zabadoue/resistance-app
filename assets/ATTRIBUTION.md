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

## `audio/` — musiques et effets (libres de droit)

Sons réels ajoutés le 2026-07-08 en complément du son **procédural** (qui reste : le
`MusicDirector` empile sa batterie/basse en combat par-dessus la vraie piste, et
`HitFX.playTone` sert de repli). Tout est converti en **MP3** (joue sur desktop,
Android ET iPhone — Safari ne décode pas l'Ogg de façon fiable). Câblé par
`systems/audio/SoundBank.ts` (chargement + volume `Settings`) et `MusicDirector.ts`.

### `audio/music/` — pistes de fond (le CALME de chaque zone)
- **`town.mp3`** ← *« Town Theme RPG »* (OpenGameArt) —
  <https://opengameart.org/content/town-theme-rpg>. Licence **CC0**. → village.
- **`unknown.mp3`** ← *« lost in the unknown »* (OpenGameArt) —
  <https://opengameart.org/content/lost-in-the-unknown>. Licence **CC0**.
  → émerveillement, labo, forêt.
- **`dungeon.mp3`** ← *« Loopable Dungeon Ambience »* (OpenGameArt) —
  <https://opengameart.org/content/loopable-dungeon-ambience>. Licence **CC0**.
  → tension, ferraille, souterrain.

### `audio/sfx/` — effets
- **`bow.mp3`** ← *« Bow & Arrow Shot »* (OpenGameArt) —
  <https://opengameart.org/content/bow-arrow-shot>. Licence **CC-BY 3.0**
  (FLARE / Clint Bellanger et contributeurs) — **attribution requise** (ce fichier).
- **`impact_soft.mp3`** (flèche/coup qui touche), **`thud.mp3`** (battage foreuse /
  pompe), **`slash.mp3`** (lame), **`pickup.mp3`** (ramassage), **`ui.mp3`** (clic de
  menu), **`em.mp3`** (onde EM) ← **Kenney Game Assets** (packs *Impact Sounds*,
  *RPG Audio*, *UI Audio*, *Digital Audio*) — <https://kenney.nl>. Licence **CC0**.

> Le perso (rig FK), les PNJ, les décors désert/village et l'UI restent **procéduraux**
> (dessinés au runtime via `Graphics`).
