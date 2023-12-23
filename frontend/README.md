# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

```
stylish_frontend
├─ .eslintrc.cjs
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ 03
│  │  │  ├─ 3a787f51cad5a352236e1461ccf7c101f2963c
│  │  │  └─ eddb82f117b2e68f83bf1212a3ebdf68c474af
│  │  ├─ 06
│  │  │  ├─ 6d8c2de5bed55ef462655d12172fa47e40b596
│  │  │  └─ 750a2cf6051dbe0225eb7b13914875a340813e
│  │  ├─ 11
│  │  │  └─ f02fe2a0061d6e6e1f271b21da95423b448b32
│  │  ├─ 13
│  │  │  └─ 93ad1a5b001b803ed81df2ff22423b27d80c0d
│  │  ├─ 14
│  │  │  └─ d59ea1c6e592901cc6285e7400c9265752de27
│  │  ├─ 1b
│  │  │  └─ 6f5e90b400f6cc4477f37da43cd99b64d58098
│  │  ├─ 1c
│  │  │  └─ 012baa1fb7d70424047e0876ce7edb297ab763
│  │  ├─ 1e
│  │  │  └─ be379f5f423c7dcc8775d39ffd571117fb89f8
│  │  ├─ 1f
│  │  │  └─ 514ccda875a6f62f80b29002c9d838be7ed822
│  │  ├─ 22
│  │  │  └─ 95130a3ca222b1c393b6cb0bcc2cbc6e73c218
│  │  ├─ 24
│  │  │  └─ 2ebc4f2e7118e9b76bb8916569c3c17523a66d
│  │  ├─ 29
│  │  │  └─ d4e4692f1c4ed9fcc82e482ed607293b82bd78
│  │  ├─ 2b
│  │  │  └─ 9ededd9ca1f9f2f01f3d74dcfc222c0c14b5b3
│  │  ├─ 2d
│  │  │  └─ 272a70bb335b35893d72e06f14f412cfbd8227
│  │  ├─ 2e
│  │  │  └─ 7af2b7f1a6f391da1631d93968a9d487ba977d
│  │  ├─ 32
│  │  │  ├─ 91385aee1ce0838fab303aa1d2c8ebdeeda28f
│  │  │  └─ d554d867fea77d880ba99c53bdbc6577857b93
│  │  ├─ 33
│  │  │  └─ 546b82b986e232304c5c32f9c86a053299c9d1
│  │  ├─ 34
│  │  │  └─ 94cd551b726663c80f55fd24c94d4209cbf460
│  │  ├─ 36
│  │  │  └─ c0b814def42e174e211c96ef08da716c5c8ac5
│  │  ├─ 38
│  │  │  └─ b6171b487b7aa206336178fa29051e8d653e79
│  │  ├─ 3a
│  │  │  └─ 9e3dd018fcd7a360512308ec195ab19b40c93a
│  │  ├─ 3b
│  │  │  └─ 571283cf8a6b096adb183ec3824dbf9cb74cc8
│  │  ├─ 3d
│  │  │  └─ 7150da80e43e3650342aa4758fa8b74e95d6d6
│  │  ├─ 3f
│  │  │  ├─ 160dc2fcd93a86bcf967ee2edccbfa33012bc1
│  │  │  ├─ 266ef9fc1cebf00cc40c83284aabfcfaf2a4e0
│  │  │  └─ b3548030cb1af96408895fcb6db8d874200b7a
│  │  ├─ 42
│  │  │  └─ 872c59f5b01c9155864572bc2fbd5833a7406c
│  │  ├─ 44
│  │  │  └─ f23af7e2d879d6201cdc6f2bb6a386cd3cd243
│  │  ├─ 4a
│  │  │  └─ 3377829bd355164bc2b8427ee3ca0f6b944e69
│  │  ├─ 4b
│  │  │  ├─ 825dc642cb6eb9a060e54bf8d69288fbee4904
│  │  │  └─ da70c76b3cdcc634c66daa5d1b08ed5bd6a4ca
│  │  ├─ 54
│  │  │  ├─ 16e49531b354522592fd9f2edaf90532d53383
│  │  │  └─ a620e54094e1be64021522c0b0d1ccbfdab332
│  │  ├─ 55
│  │  │  ├─ 75157e0844f6b4262b97736706f8ecd898b2d5
│  │  │  └─ 7b37c44d5cb352ff331f90e7fba0189cdfa65e
│  │  ├─ 57
│  │  │  └─ c29211553f4b988fccfa8b6c29cc6c74f5e005
│  │  ├─ 58
│  │  │  └─ d6090068ebd72fdc814cecba1b8944ce52be49
│  │  ├─ 5a
│  │  │  └─ 9d010ef86cd729fd1fac051b90ed545cf5f650
│  │  ├─ 5c
│  │  │  └─ e494ad1f46b21740e4faeee997ab6c86899f54
│  │  ├─ 61
│  │  │  ├─ 4c86b487fa1bb02b80dcf725f9438d772f010a
│  │  │  └─ ca4a1cb8357c1c15b22e639d0649a98161c7d4
│  │  ├─ 68
│  │  │  ├─ 1e91b300bb8a845a8ec1e165315dae46b9d9b1
│  │  │  └─ c46afbe06711a9cac566cafbe0e1cabb387642
│  │  ├─ 69
│  │  │  └─ 1e4eda8d352aad3e5ab077f9a049b6fb0d2aad
│  │  ├─ 6b
│  │  │  └─ 22762a6881a247f1a423ab3dc8ed369f87d6dc
│  │  ├─ 6c
│  │  │  ├─ 87de9bb3358469122cc991d5cf578927246184
│  │  │  ├─ a93632b1120d322f70ff321edc71a49d41f4eb
│  │  │  └─ db4b4e008a1343b5559adaaef5972221e0eb89
│  │  ├─ 6d
│  │  │  └─ ddaab5a0a0b43658dcff80cf55f4141d5acc86
│  │  ├─ 6f
│  │  │  └─ 56783e7ef08da2114fc720244d81c67f61b492
│  │  ├─ 74
│  │  │  ├─ 42645d76e367b7d49bb0b615341afacb6e3bc7
│  │  │  └─ 97ce3a8249dbb4eb49176446d3ccfb772fe4f5
│  │  ├─ 77
│  │  │  └─ a8ff4d38cf5cc2681634edbf2f91c56f9edc40
│  │  ├─ 82
│  │  │  └─ a4b0fe807be60de0802eac79ccc95ac3a375da
│  │  ├─ 84
│  │  │  └─ 1387bfbbad9daa39e653e00525b0fdabc35c2a
│  │  ├─ 85
│  │  │  └─ c7530899c9648c46dd1e84d6348e1d3fe79e93
│  │  ├─ 86
│  │  │  ├─ 1b04b35601de92787a1a0db6c9fa190975d220
│  │  │  └─ 36f8d7cffc2f71a78f7401ac8261b298e78394
│  │  ├─ 8d
│  │  │  └─ a58768de184e801eeb60f40f407b0acde036ff
│  │  ├─ 91
│  │  │  ├─ 41629fb75977e295c72ac3399e49c74759d14a
│  │  │  └─ f27086d443b1a89b7b899c7f37aa2b817f66aa
│  │  ├─ 93
│  │  │  └─ abc6fa890e946008823e38b9122fa61efeb86e
│  │  ├─ 94
│  │  │  └─ c0b2fc152a086447a04f62793957235d2475be
│  │  ├─ 99
│  │  │  └─ e7f0de5701e3514e3e61a6c54e6f0235d42819
│  │  ├─ 9c
│  │  │  └─ d1b7911801603e8b59982271e028c99b765787
│  │  ├─ 9d
│  │  │  └─ c022321a31ef1a479af9806005b27cf7268a5d
│  │  ├─ 9e
│  │  │  └─ 2c6d3e05e269117b7fc8ea238846304abfc82d
│  │  ├─ a0
│  │  │  └─ 0c7015a24b106b26585739c2e67c953703a920
│  │  ├─ a1
│  │  │  ├─ 97de89671c40943bd428085cc1b385e4f4a1fc
│  │  │  └─ b8779ace3a93b2674d9ab4ce71cda9c8e5a2c7
│  │  ├─ a4
│  │  │  └─ f2382ca39b54ae73fa0766f922d03126c4ecaf
│  │  ├─ a5
│  │  │  ├─ 47bf36d8d11a4f89c59c144f24795749086dd1
│  │  │  └─ 661ee74960fdc63d423db7527b7eca2b7ec427
│  │  ├─ a7
│  │  │  └─ fc6fbf23de2a53e36754bc4a2c306d0291d7b2
│  │  ├─ aa
│  │  │  ├─ 578db372a347bc5067d44a06f60aeca14ac6f9
│  │  │  └─ cc3e98b3ee63871ce55265c3e6d5a738259de8
│  │  ├─ ad
│  │  │  ├─ 55f73f775c2f701efdf21e71766057f4d4f6d5
│  │  │  └─ 94ef851e731b61952589f62c3a3f2b4af1d9ef
│  │  ├─ af
│  │  │  ├─ 5c0f51a7e207f7b7fb5e00741b386c8dbcb79a
│  │  │  └─ e48ac750194a747f5665300d14049f72011a33
│  │  ├─ b0
│  │  │  └─ 92fa811ed90b0fcc12ca5feddbac9ef4df790b
│  │  ├─ b2
│  │  │  └─ f1ab572710b994a47fa9e81df6e2463e58162f
│  │  ├─ b4
│  │  │  └─ 69a29574d2889ffdb133c552de6ce15e7334a4
│  │  ├─ b5
│  │  │  ├─ b548efad6be7b4b69ac7a0a44b274ff4d303e8
│  │  │  └─ d6d4c89974414a95916445f0e551e58c2351fb
│  │  ├─ b7
│  │  │  └─ 9ad098f05fdbb7463074b8e08f1685f702da9f
│  │  ├─ b8
│  │  │  └─ e02f21903ff8ca6b987ca69225b482985a09a1
│  │  ├─ b9
│  │  │  └─ d355df2a5956b526c004531b7b0ffe412461e0
│  │  ├─ ba
│  │  │  └─ eb76bf0b32a575041ffb80fecac8bf60cfd253
│  │  ├─ bf
│  │  │  ├─ 32d35a8b7d4f469150a6032c0d987978c38761
│  │  │  └─ 8800e924c1a3527b9924121bae32ed6197428d
│  │  ├─ c0
│  │  │  ├─ 6e35a1143ee4a2513da33c05b3ccfcf5a6c4bd
│  │  │  └─ f43f58f772688cf8bd8b0fb8d0fbcf3fc52433
│  │  ├─ c4
│  │  │  └─ 98636d41a1491dc4f70d17377693ba8450304a
│  │  ├─ c7
│  │  │  └─ d25f8cc4a5968433597e66316c066b8ce44832
│  │  ├─ c8
│  │  │  └─ 19f123b93811e1b0e56207c21679f49c3ef0ba
│  │  ├─ c9
│  │  │  └─ be979a8eed2bbedd5ee79964b02b7ab256878b
│  │  ├─ ca
│  │  │  └─ 4450938f73fc6ee1033817ef14351e0296b579
│  │  ├─ d1
│  │  │  └─ 60881134448ded583457ef206435e20ae14277
│  │  ├─ d6
│  │  │  └─ c953795300e4256c76542d6bb0fe06f08b5ad6
│  │  ├─ d9
│  │  │  └─ d705c3bc12cd4af29c6fbd3f89c75daffbc8a8
│  │  ├─ dd
│  │  │  └─ ad2e8e388d0f908dee5800e6e1d542aa80dfd9
│  │  ├─ e4
│  │  │  ├─ b78eae12304a075fa19675c4047061d6ab920d
│  │  │  └─ d3ef67fc6bc31efddfea1150e77230454592e6
│  │  ├─ e6
│  │  │  ├─ 9de29bb2d1d6434b8b29ae775ad8c2e48c5391
│  │  │  └─ f2a8e6fcd903918f90f1c7d3bb6d4ef9882fdc
│  │  ├─ e7
│  │  │  ├─ 81ea96bd11e68b4cc6a8203948d7555004ac3d
│  │  │  └─ b8dfb1b2a60bd50538bec9f876511b9cac21e3
│  │  ├─ e9
│  │  │  ├─ 09542dafc0b2cbce5da8c974dedbc6eea17b54
│  │  │  └─ bb54e9b33c5f4b3d84d5d8d417a046fb291642
│  │  ├─ ea
│  │  │  └─ 1e5c39765a04c8b3ab3d2f0153400a561e5a02
│  │  ├─ ec
│  │  │  ├─ 5ffc63f9a1bc297db9f669609949468ac0d8ab
│  │  │  └─ cae96c5ba3552bfba30f93ac8d4d9e0795e3da
│  │  ├─ ef
│  │  │  └─ 543d5dad852220cc538793acf7fa9ec6f67892
│  │  ├─ f8
│  │  │  └─ 620b6251f3c725f82993d32e0eefee3b4610a9
│  │  ├─ fd
│  │  │  └─ a3abfac1c5a7ecaeed4520e702d43ba997a4e7
│  │  ├─ fe
│  │  │  └─ 9b31af1f3e449ef17dc50ac1128e0b92141242
│  │  ├─ info
│  │  └─ pack
│  ├─ ORIG_HEAD
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .pytest_cache
│  ├─ .gitignore
│  ├─ CACHEDIR.TAG
│  ├─ README.md
│  └─ v
│     └─ cache
│        └─ stepwise
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ assets
│  │  ├─ images
│  │  │  ├─ carousel-images
│  │  │  │  └─ 1.png
│  │  │  ├─ icon-images
│  │  │  │  ├─ cart-hover.png
│  │  │  │  ├─ cart-mobile.png
│  │  │  │  ├─ cart-remove-hover.png
│  │  │  │  ├─ cart-remove.png
│  │  │  │  ├─ cart.png
│  │  │  │  ├─ facebook.png
│  │  │  │  ├─ line.png
│  │  │  │  ├─ loading.gif
│  │  │  │  ├─ logo.png
│  │  │  │  ├─ member-hover.png
│  │  │  │  ├─ member-mobile.png
│  │  │  │  ├─ member.png
│  │  │  │  ├─ search-hover.png
│  │  │  │  ├─ search.png
│  │  │  │  └─ twitter.png
│  │  │  ├─ product-images
│  │  │  │  └─ skirt.png
│  │  │  └─ testImages
│  │  │     ├─ 1.jpg
│  │  │     ├─ 2.jpg
│  │  │     ├─ 3.jpg
│  │  │     ├─ cart-hover.png
│  │  │     ├─ cart-mobile.png
│  │  │     ├─ cart-remove-hover.png
│  │  │     ├─ cart-remove.png
│  │  │     ├─ cart.png
│  │  │     ├─ facebook.png
│  │  │     ├─ line.png
│  │  │     ├─ loading.gif
│  │  │     ├─ logo.png
│  │  │     ├─ member-hover.png
│  │  │     ├─ member-mobile.png
│  │  │     ├─ member.png
│  │  │     ├─ search-hover.png
│  │  │     ├─ search.png
│  │  │     └─ twitter.png
│  │  └─ react.svg
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ components
│  │  ├─ common
│  │  │  ├─ Footer
│  │  │  │  └─ index.tsx
│  │  │  └─ Header
│  │  │     └─ index.tsx
│  │  └─ homepage
│  │     ├─ Banner
│  │     │  ├─ index.css
│  │     │  └─ index.tsx
│  │     ├─ ProductCard
│  │     │  └─ index.tsx
│  │     └─ ProductGrid
│  │        └─ index.tsx
│  ├─ hooks
│  │  └─ useWindowWidth.tsx
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ CartPage.tsx
│  │  ├─ HomePage.tsx
│  │  └─ ProfilePage.tsx
│  ├─ types
│  │  └─ Product.ts
│  └─ vite-env.d.ts
├─ tailwind.config.js
├─ todos
├─ tsconfig.json
├─ tsconfig.node.json
├─ vite.config.ts
└─ 筆記

```