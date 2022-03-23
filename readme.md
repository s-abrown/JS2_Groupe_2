# Projet Groupe 2 - Messagerie instantanée avec messages prédéfinis

# Contexte
Ce projet est développé dans le cadre du cours "Programmation pour Internet II" (printemps 2022) dispensé par Loïc Cattani (Université de Lausanne).

# Description et principe
Ce projet consiste en une messagerie qui a pour but principaux d'être facile à utiliser, rapide, jolie et polyvalente.
Les utilisateurs doivent se créer un compte en fournissant leur adresse email, un nom d'utilisateur et un mot de passe. Une fois ceci fait, ils peuvent accéder à l'application et commencer à l'utiliser.

L'interface se veut simple et demandant le moins de clics possible dans le but d'être réactive. L'écran de démarrage permet de rapidement se créer un compte ou se connecter avec un compte existant. Une fois ceci fait, l'utilisateur peut librement cliquer sur les groupes auquels il appartient pour voir les derniers messages échangés, ou alors créer un nouveau groupe et inviter d'autres personnes (en entrant leur identifiant ou leur adresse email).

Pour envoyer un message, il suffit de le choisir dans la liste des messages par défaut et cliquer dessus. Il n'y a pas besoin de saisir de texte via un clavier. Le choix du message à envoyer se fait parmi une liste par défaut où les messages sont ordonnés par priorité (rouge étant une priorité "maximale", orange "moyenne" et vert "basse"). Le créateur d'un groupe peut aussi définir, lors de sa création et en plus des messages par défaut, des messages personnalisés et indiquer leur priorité.

Lorsqu'un message avec une priorité maximale est envoyé, une notification est envoyée sur la page d'accueil pour informer tous les utilisateurs rapidement.

# Fonctionnalités
- Interface simple et minimale, ce qui permet une utilisation rapide
- Ne nécessite pas l'utilisation de clavier, car les messages sont sélectionnés dans une liste déroulante
- Différents types de messages par défaut classés par ordre "d'urgence"
- Utilisation de codes de couleurs pour définir la priorité des messages
- Possibilité de créer des groupes et y ajouter des messages personnalisés
- etc.

# Illustrations et images
(à faire)

# Installation
(à faire)

# License
(à définir plus tard)

# Descriptif du projet

# Liste des collaborateurs du projet
    > A définir ?

# Analyse concurentielle, état de l'art
    > Pas d'applications similaires en terme de messagerie utilisant un système quick-messaging.
    Mais beaucoup des apps de messagerie en général. 
    
# Analyse de faisabilité
    > Très bonne question - devrait être faisable 
    
# Analyse fonctionelle

# Technologies utilisées

# Fonctionnalités planifiées/implémentées
- phase création de compte
- phase log in
- phase de création de groupe
- phase de choix de messages instantanés au moment de la création du groupe
- possibilité de changer et personaliser la liste de quick-messages.
- choix de priorité des messages au moment de conception
- possibilité de change la priorité si nécessaire au moment d'envoi
- phase de messagerie instantanée 
- naviguer entre les groupes
- notification des messages

- base de donnée (compte, liste de quick-messages, groupes)

- Une logique intuitive et simple à mettre en main

# Meta : Commencer à penser à la gestion du projet et à la répartition des tâches (tâches par composants et non par domaines)

- Concept UI/UX, wireframes
![wireframe](wireFrame.jpeg)

- Un système intuitif et familier

# Description du MVP
Tous sauf le système des priorités. 
