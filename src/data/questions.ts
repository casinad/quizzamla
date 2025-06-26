export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Quel type d'appareillage à préconiser en cas de colostomie droite et iléostomie ?",
    options: ["Poches vidangeables", "Poches fermées", "Poches vidables"],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Quel type d'appareillage à préconiser en cas de colostomie gauche ?",
    options: ["Poches vidangeables", "Poches fermées, sauf en cas de transit accéléré", "Poches vidables"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Quelle est la fonction des multi chambres dans les poches d'urostomie « Coloplast SenSura » ?",
    options: [
      "Pour neutraliser les odeurs",
      "Pour assurer une plus grande capacité",
      "Pour prévenir les fuites",
      "Pour la discrétion – aplatir la poche et réduire le bruit de liquides"
    ],
    correctAnswer: 3
  },
  {
    id: 4,
    question: "Quel est l'intérêt du filtre intégré dans la poche digestive « Coloplast SenSura » ?",
    options: [
      "Il réduit le bruit",
      "Il réduit la fréquence de changement des poches",
      "Il n'est présent que dans les poches de l'appareil digestif",
      "Il élimine le gonflement et les mauvaises odeurs"
    ],
    correctAnswer: 3
  },
  {
    id: 5,
    question: "Quelle solution à préconiser chez un patient porteur d'une iléostomie ou colostomie droite (risque de fuites d'effluents acides agressifs) ?",
    options: [
      "Pâte Brava",
      "Anneau modelable Brava",
      "Plaque de protection Brava",
      "Poudre Brava",
      "Ceinture Brava"
    ],
    correctAnswer: 2
  },
  {
    id: 6,
    question: "Quelle solution pour combler un pli profond dans la zone péristomiale ?",
    options: [
      "Pâte Brava",
      "Anneau modelable Brava",
      "Plaque de protection Brava",
      "Poudre Brava",
      "Ceinture Brava"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    question: "Quelle solution pour traiter les irritations péristomiales suite à des fuites ?",
    options: [
      "Pâte Brava",
      "Anneau modelable Brava",
      "Plaque de protection Brava",
      "Poudre Brava",
      "Ceinture Brava"
    ],
    correctAnswer: 3
  },
  {
    id: 8,
    question: "Quelle solution pour assécher une zone péristomiale trop humide avant d'appliquer l'appareillage ?",
    options: [
      "Pâte Brava",
      "Anneau modelable Brava",
      "Plaque de protection Brava",
      "Poudre Brava",
      "Ceinture Brava"
    ],
    correctAnswer: 3
  },
  {
    id: 9,
    question: "Quelle solution pour renforcer l'adhésion du support notamment en cas de patient actif ou de stomie mal située ?",
    options: [
      "Pâte Brava",
      "Anneau modelable Brava",
      "Plaque de protection Brava",
      "Poudre Brava",
      "Ceinture Brava"
    ],
    correctAnswer: 4
  },
  {
    id: 10,
    question: "Quelle solution en cas de stomie bombée ou rétractée ?",
    options: [
      "Utiliser un système 1 pièce",
      "Utiliser un système 2 pièces seul sans accessoire",
      "Utiliser un système 2 pièces avec ceinture",
      "Aucune réponse n'est juste"
    ],
    correctAnswer: 2
  },
  {
    id: 11,
    question: "Concernant le support Coloplast SenSura :",
    options: [
      "Il s'agit d'un appareillage de dernière génération",
      "Il contient deux couches d'adhésif pour une double protection",
      "Il a été soigneusement conçu pour améliorer la qualité de vie des patients",
      "Toutes ces réponses sont justes"
    ],
    correctAnswer: 3
  },
  {
    id: 12,
    question: "Quelle est la principale différence entre une sonde hydrophile prélubrifiée et une sonde hydrophile autolubrifiée ?",
    options: [
      "La sonde hydrophile prélubrifiée nécessite une lubrification manuelle",
      "La sonde hydrophile prélubrifiée est prête à l'emploi immédiatement",
      "La sonde hydrophile autolubrifiée a un revêtement uniforme sans points secs",
      "La sonde hydrophile autolubrifiée nécessite une activation par solution saline"
    ],
    correctAnswer: 2
  },
  {
    id: 13,
    question: "Quels sont les avantages de la sonde SpeediCath Flex ?",
    options: [
      "Pointe en boule pour une insertion en douceur",
      "Poignet d'insertion pour un sondage hygiénique",
      "Munie d'une gaine no-touch pour un sondage intuitif",
      "Emballage refermable sans aluminium"
    ],
    correctAnswer: 2
  },
  {
    id: 14,
    question: "Quel avantage spécifique les sondes hydrophiles autolubrifiées prêtes à l'emploi offrent-elles aux patients ayant une mobilité réduite ?",
    options: [
      "Elles sont plus flexibles",
      "Elles nécessitent moins d'étapes de préparation, simplifiant ainsi le processus",
      "Elles sont plus longues",
      "Elles ont un diamètre plus petit"
    ],
    correctAnswer: 1
  },
  {
    id: 15,
    question: "Quel est l'avantage de la propriété \"reste collé\" du revêtement des sondes hydrophiles autolubrifiées ?",
    options: [
      "Elle permet une insertion plus rapide",
      "Elle garantit que le revêtement ne se détache pas pendant la préparation, l'insertion et le retrait, évitant ainsi les points secs",
      "Elle augmente la rigidité de la sonde",
      "Elle permet une réutilisation de la sonde"
    ],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "Quel est l'un des principaux avantages des sondes hydrophiles autolubrifiées par rapport aux sondes prélubrifiées ?",
    options: [
      "Elles sont plus économiques",
      "Elles réduisent les traumatismes urétraux et la friction",
      "Elles nécessitent une lubrification manuelle avant utilisation",
      "Elles ont une durée de vie plus longue"
    ],
    correctAnswer: 1
  }
];