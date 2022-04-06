# Projet Groupe 2 - Messagerie instantanée avec messages prédéfinis

# Contexte
Ce projet est développé dans le cadre du cours "Programmation pour Internet II" (printemps 2022) dispensé par Loïc Cattani (Université de Lausanne).

# Liste des collaborateurs du projet
- Sophie Brown
- Vache
- Antonin
- Tessa Cattaneo
- Norrick Malandain

# Description et principe
Ce projet consiste en une messagerie qui a pour but principaux d'être facile à utiliser, rapide, jolie et polyvalente.
Les utilisateurs doivent se créer un compte en fournissant leur adresse email, un nom d'utilisateur et un mot de passe. Une fois ceci fait, ils peuvent accéder à l'application et commencer à l'utiliser.

L'interface se veut simple et demandant le moins de clics possible dans le but d'être réactive. L'écran de démarrage permet de rapidement se créer un compte ou se connecter avec un compte existant. Une fois ceci fait, l'utilisateur peut librement cliquer sur les groupes auquels il appartient pour voir les derniers messages échangés, ou alors créer un nouveau groupe et inviter d'autres personnes (en entrant leur identifiant ou leur adresse email).

Pour envoyer un message, il suffit de le choisir dans la liste des messages par défaut et cliquer dessus. Il n'y a pas besoin de saisir de texte via un clavier. Le choix du message à envoyer se fait parmi une liste par défaut où les messages sont ordonnés par priorité (rouge étant une priorité "maximale", orange "moyenne" et vert "basse"). Le créateur d'un groupe peut aussi définir, lors de sa création et en plus des messages par défaut, des messages personnalisés et indiquer leur priorité.

Lorsqu'un message avec une priorité maximale est envoyé, une notification est envoyée sur la page d'accueil pour informer tous les utilisateurs rapidement.

# Fonctionnalités (général)
- Interface simple et minimale, ce qui permet une utilisation rapide
- Ne nécessite pas l'utilisation de clavier, car les messages sont sélectionnés dans une liste déroulante
- Différents types de messages par défaut classés par ordre "d'urgence"
- Utilisation de codes de couleurs pour définir la priorité des messages
- Possibilité de créer des groupes et y ajouter des messages personnalisés
- etc.

# Fonctionnalités planifiées/implémentées (plus dans le détail)
- Phase création de compte
- Phase log in
- Phase de création de groupes
- Phase de choix de messages instantanés au moment de la création d'un groupe
- Possibilité de changer et personaliser la liste de quick-messages
- Choix de la priorité des messages au moment de conception
- Possibilité de changer la priorité au moment de l'envoi, si nécessaire
- Phase de messagerie instantanée 
- Naviguation entre les groupes
- Notification des messages
- Base de données (compte, liste de quick-messages, groupes)
- Logique intuitive et simple à mettre en main

# Illustrations et images
## Concept UI/UX, wireframe
![wireframe](wireFrame.jpeg)
- Un système intuitif et familier

# Analyse concurentielle, état de l'art
Il existe de nombreuses applications de messagerie avec des fonctionnalités beaucoup plus avancées que celle que nous proposons. Whatsapp, Telegram, WeChat, Signal, etc. permettent de partager avec des groupes prédéfinis non seulement des messages, mais aussi des images, des vidéos ou des audios. Certaines applications sont également étroitement liées à des plateformes d'emails, comme Hangouts ou Teams. En général, il ne semble pas y avoir d'applications de messagerie qui reposent sur des messages préenregistrés. L’intérêt principal de notre app est de permette une communication rapide en un nombre limité des clicks. 

En ce qui concerne la hiérarchisation des messages, de nombreuses applications offrent la possibilité d'organiser les éléments selon un schéma de couleurs, il s’agit surtout des applications de listes de tâches qui offrent souvent la possibilité de partager les listes avec des groupes ou des individus.

Fonctionnalités déjà utilisées par d'autres apps : création d'un compte, création de groupes avec un administrateur, priorité des messages par couleur. 
Innovations/Différences : système de messages préenregistrés.

# Installation
(à faire)

# License
(à définir plus tard)

# Analyse de faisabilité
> Très bonne question - devrait être faisable 
    
# Analyse fonctionelle

# Technologies utilisées

# Meta : Commencer à penser à la gestion du projet et à la répartition des tâches (tâches par composants et non par domaines)

# Description du MVP
Tous sauf le système des priorités/notifications. 
