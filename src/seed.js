import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Tab from "./models/Tab.js";

dotenv.config();

const tabs = [
  {
    key: "global",
    label: "Global",
    emoji: "⚖️",
    accentColor: "#f39c12",
    sections: [
      {
        title: "Philosophie du serveur",
        order: 0,
        cards: [
          {
            icon: "⚖️",
            title: "Cohérence générale",
            color: "yellow",
            order: 0,
            content: `Le maître mot du serveur est la **cohérence**. Le règlement est là pour encadrer, pas pour remplacer votre bon sens. Tout ce qui n'est pas explicitement couvert doit être géré avec logique et fairplay. En cas de doute, ouvrez un ticket — le staff est là pour vous orienter.`,
          },
        ],
      },
      {
        title: "Cohérence du personnage",
        order: 1,
        cards: [
          {
            icon: "🎭",
            title: "Backstory obligatoire",
            color: "yellow",
            order: 0,
            content: `Tout personnage doit avoir une raison valable d'exister dans le milieu qu'il occupe. On ne passe pas de citoyen lambda à criminel endurci du jour au lendemain. La progression doit être naturelle et cohérente.\n\n- Si le joueur souhaite passer de civil à criminel, cela doit se faire progressivement en RP\n- Respecter la progression naturelle du personnage\n- EMS ou LSPD corrompu autorisé dès le début sous dossier`,
          },
          {
            icon: "🔄",
            title: "Changement de camp",
            color: "yellow",
            order: 1,
            content: `Les personnages corrompus (FDO ripoux, indicateurs) sont autorisés sous dossier validé par le staff.\n\n- Un corrompu ne peut pas intégrer un groupe illégal ni en favoriser un gratuitement — uniquement des échanges lucratifs\n- Un indicateur peut être tué en RP si sa couverture est découverte\n- Un flic exemplaire qui bascule sans raison RP n'est pas valide — prévenez le staff en amont`,
          },
        ],
      },
      {
        title: "Fear RP — Roleplay de la peur",
        order: 2,
        cards: [
          {
            icon: "😰",
            title: "Règle générale",
            color: "yellow",
            order: 0,
            content: `Votre personnage ressent la peur. Quand une arme est pointée sur vous ou que vous êtes encerclé en infériorité, vous coopérez.\n\n❌ Refuser d'obéir sans raison valable est un mauvais FearRP.\n\n- Être braqué → coopérer s'il y a infériorité numérique\n- Être encerclé par plusieurs armés → éviter toute action héroïque irréaliste`,
          },
        ],
      },
      {
        title: "Pain RP — Roleplay de la douleur",
        order: 3,
        cards: [
          {
            icon: "🩹",
            title: "Règle générale",
            color: "yellow",
            order: 0,
            content: `Les blessures affectent votre personnage. Après un accident grave ou un coup violent, vous ne repartez pas comme si de rien ne s'était passé.\n\n❌ Courir ou se battre normalement après une blessure sérieuse est interdit.\n\n- Accident de voiture → boiter, être désorienté\n- Coup de feu → incapacité partielle, besoin de soins`,
          },
        ],
      },
      {
        title: "Meta Gaming",
        order: 4,
        cards: [
          {
            icon: "🚫",
            title: "Définition et interdictions",
            color: "yellow",
            order: 0,
            content: `Utiliser des informations obtenues hors RP dans le jeu est **interdit**. Votre personnage ne sait que ce qu'il apprend en jeu.\n\n❌ Connaître la position d'un joueur grâce à un stream\n❌ Utiliser Discord ou un vocal externe pour informer un allié en jeu`,
          },
        ],
      },
      {
        title: "Power Gaming",
        order: 5,
        cards: [
          {
            icon: "💪",
            title: "Définition et interdictions",
            color: "yellow",
            order: 0,
            content: `Forcer une action irréaliste ou empêcher un autre joueur de réagir est interdit. **Toute action doit laisser une possibilité de réponse cohérente.**\n\n❌ Action physiquement impossible\n❌ "Je te mets KO instantanément" sans laisser de réponse`,
          },
        ],
      },
      {
        title: "Bleeding émotionnel",
        order: 6,
        cards: [
          {
            icon: "💙",
            title: "Procédure",
            color: "yellow",
            order: 0,
            content: `Quand les émotions du personnage débordent sur le joueur, tapez **/me bleeding**. La scène est mise en pause et un staff intervient.\n\n❌ Attaquer personnellement un joueur à cause d'une action RP\n❌ Garder de la rancune HRP après une scène difficile\n✅ Communication mature, prise de recul si besoin`,
          },
        ],
      },
      {
        title: "Coma & KO",
        order: 7,
        cards: [
          {
            icon: "💫",
            title: "Règles",
            color: "yellow",
            order: 0,
            content: `**KO** : état après un coup violent, relevée sans aide médicale. **Coma** : intervention médicale obligatoire.\n\n- KO ou en coma → aucune communication possible\n- KO → vous oubliez les **20 dernières secondes**\n- Coma → les SAMS doivent être prévenus, vous oubliez la scène, ne retournez pas sur les lieux`,
          },
        ],
      },
      {
        title: "Mort RP",
        order: 8,
        cards: [
          {
            icon: "💀",
            title: "Procédure",
            color: "yellow",
            order: 0,
            content: `Une mort RP se demande via ticket. Le staff peut l'appliquer d'office si un joueur est trop régulièrement hospitalisé avec des blessures graves.`,
          },
        ],
      },
      {
        title: "Zones RP & Zones interdites",
        order: 9,
        cards: [
          {
            icon: "🗺️",
            title: "Zones de masse RP",
            color: "yellow",
            order: 0,
            content: `Les zones de masse RP sont des zones où la population, même non présente, doit être prise en compte : **Gouvernement, PDP, Hôpital**.`,
          },
          {
            icon: "⛔",
            title: "Zones interdites",
            color: "yellow",
            order: 1,
            content: `Accès prohibé en toutes circonstances : **Base militaire, Porte-avions, Villa Cayo**.`,
          },
        ],
      },
      {
        title: "Cop Baiting",
        order: 10,
        cards: [
          {
            icon: "🚔",
            title: "Règle",
            color: "yellow",
            order: 0,
            content: `Provoquer volontairement la police sans raison RP est interdit.\n\n❌ Infractions répétées pour lancer une poursuite\n✅ Autorisé si un contexte RP solide existe.`,
          },
        ],
      },
      {
        title: "Revenge RP",
        order: 11,
        cards: [
          {
            icon: "🎯",
            title: "Règle",
            color: "yellow",
            order: 0,
            content: `Se venger après une mort RP en utilisant des infos de la scène précédente est interdit.\n\n❌ Revenir cibler quelqu'un après un coma/wipe mémoire\n✅ Vengeance construite progressivement en RP`,
          },
        ],
      },
      {
        title: "Radio",
        order: 12,
        cards: [
          {
            icon: "📻",
            title: "Utilisation",
            color: "yellow",
            order: 0,
            content: `Les radios civiles sont accessibles à tous. Les canaux sont **publics** — les FDO peuvent les surveiller.`,
          },
        ],
      },
    ],
  },
  {
    key: "legal",
    label: "Légal",
    emoji: "🏢",
    accentColor: "#3498db",
    sections: [
      {
        title: "Création & Reprise d'entreprise",
        order: 0,
        cards: [
          {
            icon: "🏢",
            title: "Procédure générale",
            color: "blue",
            order: 0,
            content: `Toute création ou reprise d'entreprise nécessite un **dossier complet**, transmis au gouvernement via RP.`,
          },
          {
            icon: "📋",
            title: "Conditions obligatoires",
            color: "blue",
            order: 1,
            content: `- Minimum **1 semaine de RP** sur le serveur avant de déposer un dossier\n- Dossier 100% légal, sauf dérogation validée par le staff\n- Un patron ne peut pas posséder **deux entreprises simultanément**\n- Minimum **2 événements par mois** à organiser`,
          },
          {
            icon: "📅",
            title: "Absence & Inactivité",
            color: "blue",
            order: 2,
            content: `Le patron doit rester actif. Toute absence supérieure à une semaine sans signalement entraîne le retrait de l'entreprise.`,
          },
          {
            icon: "📊",
            title: "Comptabilité",
            color: "blue",
            order: 3,
            content: `Une comptabilité stricte doit être tenue à jour et rendue chaque fin de semaine dans le canal dédié.`,
          },
        ],
      },
    ],
  },
  {
    key: "illegal",
    label: "Illégal",
    emoji: "🔫",
    accentColor: "#e74c3c",
    sections: [
      {
        title: "Niveaux d'activité criminelle",
        order: 0,
        cards: [
          {
            icon: "1️⃣",
            title: "Niveau 1 — Petit criminel / Indépendant",
            color: "green",
            order: 0,
            content: `- Vols à la tire, petits cambriolages\n- Revente de marchandises volées\n- Trafic de drogues douces\n- Braquages de commerces`,
          },
          {
            icon: "2️⃣",
            title: "Niveau 2 — Organisation structurée",
            color: "orange",
            order: 1,
            content: `- Production et distribution de drogues\n- Trafic d'armes léger\n- Blanchiment d'argent basique\n- Braquages de bijouteries & banques`,
          },
          {
            icon: "3️⃣",
            title: "Niveau 3 — Crime organisé",
            color: "default",
            order: 2,
            content: `Faction établie — validation staff obligatoire.\n\n- Trafic d'armes lourdes\n- Blanchiment à grande échelle\n- Contrats et éliminations ciblées`,
          },
          {
            icon: "📈",
            title: "Progression obligatoire",
            color: "default",
            order: 3,
            content: `Tout groupe démarre au niveau 1. Il faut construire sa réputation et être actif. Un groupe peu actif peut descendre d'un niveau.`,
          },
        ],
      },
      {
        title: "Fear RP — Côté illégal",
        order: 1,
        cards: [
          {
            icon: "👮",
            title: "Face aux FDO",
            color: "default",
            order: 0,
            content: `La vue d'un uniforme génère une réaction réaliste. Face à plusieurs officiers armés, vous obéissez.\n\n- Fuir face à une arme à feu = aveu de charges graves\n- Les conséquences doivent être pleinement acceptées (wipe flash)`,
          },
          {
            icon: "🔫",
            title: "Entre criminels",
            color: "default",
            order: 1,
            content: `- Pénétrer sur le territoire d'un groupe rival génère une réaction réaliste\n- Face à plusieurs armés en infériorité : se rendre ou négocier\n- La valeur de la vie prime toujours`,
          },
        ],
      },
      {
        title: "Braquages sans otage",
        order: 2,
        cards: [
          {
            icon: "🏧",
            title: "Règles",
            color: "default",
            order: 0,
            content: `Fleeca, superette, ATM — la LSPD intervient **immédiatement**. Les PNJ ne comptent pas comme otages.\n\n✅ Placer un guetteur en amont\n✅ Prévoir une route de fuite\n✅ Privilégier la rapidité sur la quantité`,
          },
        ],
      },
      {
        title: "Braquages avec otages",
        order: 3,
        cards: [
          {
            icon: "🏛️",
            title: "Otages requis par type",
            color: "default",
            order: 0,
            content: `- 🏧 ATM / Superette : aucun otage requis\n- 🏦 Fleeca : 2 minimum\n- 💍 Bijouterie : 2 minimum\n- 🏛️ Banque centrale : 4 minimum\n- 🚚 Convoi : 3 minimum`,
          },
          {
            icon: "🤝",
            title: "Règles de négociation",
            color: "default",
            order: 1,
            content: `La LSPD doit tenter une négociation avant toute intervention armée. Un accord trouvé doit être respecté des deux côtés.\n\n❌ Exécutions gratuites sans raison RP`,
          },
        ],
      },
      {
        title: "Course-poursuite",
        order: 4,
        cards: [
          {
            icon: "🚗",
            title: "Règles générales",
            color: "default",
            order: 0,
            content: `Une poursuite doit rester **fun, dynamique et crédible**.\n\n⏱️ **Après 10 minutes** : plans de récupération autorisés.`,
          },
          {
            icon: "🚙",
            title: "Logique du véhicule",
            color: "default",
            order: 1,
            content: `- **Tout-terrain** : tous types de terrains\n- **Véhicule standard** : chemin de terre sur courte distance\n- **Sportive** : ❌ interdit sur chemin de terre ou escaliers`,
          },
          {
            icon: "💥",
            title: "Gestion des accidents",
            color: "default",
            order: 2,
            content: `- ⏱ **Choc léger** : pause 2-3 secondes\n- ⏱ **Choc moyen** : arrêt prolongé obligatoire\n- 🚨 **Gros choc / tonneau** : véhicule hors service`,
          },
        ],
      },
      {
        title: "Culture de cannabis",
        order: 5,
        cards: [
          {
            icon: "🌿",
            title: "Groupes organisés",
            color: "green",
            order: 0,
            content: `Les plantations doivent se faire sur le territoire du groupe ou dans leur instance privée.\n\n❌ Pose hors territoire interdite.`,
          },
          {
            icon: "🌱",
            title: "Indépendants",
            color: "green",
            order: 1,
            content: `Peuvent planter en ville en dissimulant les pots, ou utiliser leur instance personnelle.`,
          },
          {
            icon: "👮",
            title: "Intervention FDO",
            color: "default",
            order: 2,
            content: `Perquisition autorisée uniquement avec un motif valable + une preuve RP.\n\nSans preuve, toute entrée dans une instance privée est **interdite**.`,
          },
        ],
      },
      {
        title: "Guerre RP",
        order: 6,
        cards: [
          {
            icon: "⚔️",
            title: "Déclenchement",
            color: "default",
            order: 0,
            content: `Tout conflit doit avoir une **raison RP solide**. La déclaration se fait via un RP d'ultimatum + enregistrement envoyé au staff.\n\n❌ Les guerres qui surgissent de nulle part sont sanctionnées.`,
          },
          {
            icon: "⚖️",
            title: "Déroulement et conséquences",
            color: "default",
            order: 1,
            content: `- Résolution par négociation → libre\n- Wipe total → ticket obligatoire\n- Lieux neutres (hôpital, mairie) hors zone de guerre\n\n**Conséquences :**\n- Faction perdante : perte de territoire, profil bas 24h\n- Abus : avertissement puis sanctions`,
          },
        ],
      },
      {
        title: "Horaires des activités illégales",
        order: 7,
        cards: [
          {
            icon: "👮",
            title: "Condition universelle",
            color: "default",
            order: 0,
            content: `Aucune activité illégale sans **au moins un FDO connecté**.`,
          },
          {
            icon: "🌿",
            title: "Farm illégal — 10h → 03h",
            color: "green",
            order: 1,
            content: `Autorisé de **10h00 à 03h00**.\n\n❌ Interdit de 03h01 à 09h59.`,
          },
          {
            icon: "🏧",
            title: "ATM & Supérettes — 2 FDO min.",
            color: "orange",
            order: 2,
            content: `Minimum **2 agents connectés** obligatoires.`,
          },
          {
            icon: "🏦",
            title: "Fleeca & Gros braquages — 21h → 01h",
            color: "default",
            order: 3,
            content: `Autorisé uniquement entre **21h00 et 01h00**. Minimum **5 agents connectés**.\n\n❌ Aucune exception.`,
          },
          {
            icon: "🗺️",
            title: "Tags · Territoire · Vente — 12h → 03h",
            color: "orange",
            order: 4,
            content: `Autorisé de **12h00 à 03h00**.\n\n❌ Interdit avant midi.`,
          },
        ],
      },
      {
        title: "Véhicules autorisés",
        order: 8,
        cards: [
          {
            icon: "🔫",
            title: "Gang de rue",
            color: "default",
            order: 0,
            content: `✅ Lowriders, muscle cars, berlines de quartier\n❌ Sportives haut de gamme, véhicules de luxe\n🚗 Convoi : 2-3 véhicules max`,
          },
          {
            icon: "🏍️",
            title: "Motorcycle Club",
            color: "default",
            order: 1,
            content: `✅ Choppers & customs obligatoires en groupe\n✅ 1 van de soutien toléré\n❌ Berlines, sportives\n⚠️ Solo : moto obligatoire`,
          },
          {
            icon: "🤵",
            title: "Organisation / Mafia",
            color: "default",
            order: 2,
            content: `✅ Berlines de luxe sombres, SUV premium\n✅ Limousines — boss uniquement\n❌ Tuning agressif, couleurs criardes`,
          },
          {
            icon: "🌿",
            title: "Cartel",
            color: "default",
            order: 3,
            content: `✅ Pickups, 4x4, SUV robustes\n✅ SUV blindés — figures du cartel uniquement\n❌ Sportives, luxe urbain`,
          },
          {
            icon: "⚠️",
            title: "Règles communes",
            color: "default",
            order: 4,
            content: `Changer de véhicule en cours de session est **strictement interdit**.\n\nTout abus entraîne une **saisie immédiate sans remboursement**.`,
          },
        ],
      },
    ],
  },
];

async function seed() {
  await mongoose.connect(process.env.CONNECTION_STRING);
  console.log("✅ MongoDB connecté");

  const existingAdmin = await User.findOne({ username: "admin" });
  if (!existingAdmin) {
    await User.create({
      username: "admin",
      password: "admin1234",
      role: "admin",
    });
    console.log("✅ Compte admin créé (admin / admin1234)");
  } else {
    console.log("ℹ️  Compte admin déjà existant");
  }

  for (const tabData of tabs) {
    await Tab.findOneAndUpdate({ key: tabData.key }, tabData, {
      upsert: true,
      new: true,
    });
    console.log(`✅ Onglet "${tabData.label}" inséré`);
  }

  await mongoose.disconnect();
  console.log("✅ Seed terminé");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
