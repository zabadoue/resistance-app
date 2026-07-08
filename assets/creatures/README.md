# Feuilles de sprites des animaux (creatures/)

Dépose ici une vraie **feuille de sprites** pour remplacer le dessin procédural
d'un animal. Tu contrôles l'art, le code fait tout le reste (chargement, découpe
des frames, animations). **Si un animal n'a pas de feuille ici, il reste dessiné
procéduralement** — rien ne casse.

> Câblé par `src/systems/combat/enemies/CreatureSprites.ts`. La feuille prend la
> clé de texture `forest-<name>`, donc le dessin procédural homonyme se saute tout
> seul (`EnemyTextures.ts` teste `textures.exists`).

## Où mettre quoi

Un dossier par animal, nommé EXACTEMENT comme le type d'ennemi :

```
public/assets/creatures/
  wolf/        boar/        bear/
  hunter/      woodpecker/  skunk/
    sheet.png         ← la feuille de sprites
    creature.json     ← le descripteur (taille de frame + animations)
```

Noms valides (rien d'autre n'est chargé) : **wolf, boar, bear, hunter, woodpecker, skunk**.
(Les ennemis « tribal » melee/ranged/elite restent procéduraux.)

## `sheet.png` — la grille

- Une **grille régulière** : toutes les frames font la même taille
  (`frameWidth` × `frameHeight`), sans marge ni espacement.
- Les frames sont numérotées **ligne par ligne, à partir de 0** :

  ```
  ┌────┬────┬────┬────┐
  │ 0  │ 1  │ 2  │ 3  │
  ├────┼────┼────┼────┤
  │ 4  │ 5  │ 6  │ 7  │
  └────┴────┴────┴────┘
  ```

- **L'animal doit regarder vers la DROITE.** Le jeu retourne le sprite tout seul
  quand l'animal va à gauche.
- Fond **transparent** (PNG alpha).

## `creature.json` — le descripteur

```json
{
  "frameWidth": 64,
  "frameHeight": 64,
  "scale": 1,
  "originY": 1,
  "anims": {
    "idle":   { "frames": [0, 1, 2, 1], "frameRate": 6,  "repeat": -1 },
    "walk":   { "frames": [3, 4, 5, 6], "frameRate": 10, "repeat": -1 },
    "attack": { "frames": [7, 8, 9],    "frameRate": 14, "repeat": 0  },
    "sleep":  { "frames": [10],         "frameRate": 2,  "repeat": -1 }
  }
}
```

| Champ          | Rôle |
|----------------|------|
| `frameWidth/Height` | taille d'UNE frame en pixels (obligatoire) |
| `scale`        | échelle d'affichage à l'écran (défaut `1`). Mets-la ~ taille de jeu : `idle` ≈ 40–55 px de haut rend bien |
| `originY`      | ancre verticale `0..1` (défaut `1` = les pieds posés au sol) |
| `anims.idle`   | au repos / debout |
| `anims.walk`   | en déplacement |
| `anims.attack` | au moment de frapper (mets `repeat: 0` : joué une fois) |
| `anims.sleep`  | animal calmé → endormi (le jeu ajoute aussi un petit tween de respiration) |

- `frames` = liste d'**indices** dans la grille (l'ordre = l'ordre de lecture).
- `frameRate` = images/seconde (défaut 8). `repeat: -1` = boucle, `0` = une fois.
- **`idle` et `walk` sont les plus importantes** ; `attack`/`sleep` sont
  optionnelles (sinon le jeu garde un repli raisonnable).

Un fichier `creature.example.json` est fourni dans `wolf/` comme gabarit :
copie-le en `creature.json`, ajuste les chiffres à TA feuille.

## Où trouver de l'art libre (vérifie TOUJOURS la licence)

- **OpenGameArt.org** — filtre par licence **CC0** ou CC-BY.
- **itch.io** → game assets → « free » (beaucoup d'animaux animés ; licences variées).
- **Kenney.nl** — packs CC0 (peu d'animaux de profil animés, mais propres).

Quand tu ajoutes un asset, **note sa source + licence** dans
`public/assets/ATTRIBUTION.md` (comme pour le fond de ville).

## Tester

```
npm run dev          # http://localhost:5173
```
Va dans une scène de combat (DevMenu → Sandbox, ou la forêt). Si la feuille est
bien lue, l'animal s'anime ; sinon tu revois `frameWidth/Height` (souvent la
cause) ou le nom du dossier. `npm run build` doit rester vert.
