# LuminosityRP — Backend

API REST du projet LuminosityRP, une application web destinée à un serveur GTA RP pour recenser et gérer le règlement du serveur. Inclut un système de comptes avec rôles modérateur et administrateur, et un panel d'administration pour éditer le contenu sans passer par le code.

Site live : [luminosityrp.fr](https://www.luminosityrp.fr)  
Déploiement : Vercel

## Technologies

- **Runtime** : Node.js (ES Modules)
- **Framework** : Express 4
- **Base de données** : MongoDB (Mongoose 9)
- **Authentification** : JWT (jsonwebtoken), bcryptjs
- **Langage** : JavaScript
- **Déploiement** : Vercel

## Fonctionnalites

- Authentification et gestion des rôles (modérateur, administrateur)
- CRUD sur les articles du règlement
- Seeding de la base de données via script dédié
- API REST structurée

## Structure du projet

- `src/` — Logique métier, modèles, routes et seed
- `app.js` — Configuration Express
- `vercel.json` — Configuration déploiement Vercel

## Frontend

[github.com/Len0f/LuminosityRP-frontend](https://github.com/Len0f/LuminosityRP-frontend)

## Auteur

**Caroline Viot** — Développeuse web fullstack JS  
[GitHub](https://github.com/Len0f)
