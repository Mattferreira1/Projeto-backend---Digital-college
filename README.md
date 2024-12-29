# Projeto-backend---Digital-college
# Rota para pegar a chave jwt 
- http://127.0.0.1:3000/v1/user/token

- Utilizar antes de todas as rotas de post, update e delete

- payload:
```json
{
    "email": "Teste@Teste",
    "password": "Teste"
}
```


# Rotas usuário
<details>
<summary>Find</summary>
Rota: http://127.0.0.1:3000/v1/user/:id

</details>
<details>
<summary>Create</summary>
Rota: http://127.0.0.1:3000/v1/user
requer JWT

payload:
```json
{
	"firstname": "Matheus",
    "surname": "Ferreira",
    "email": "matheus@gmail",
    "password": "2130",
    "confirmPassword": "2130"
} 
```

</details>

<details>
<summary>Update</summary>
Rota: http://127.0.0.1:3000/v1/user/:id

requer JWT

payload:

```json
{
	"firstname": "Matheus",
    "surname": "Ferreira",
    "email": "matheus@gmail",
    "password": "2130",
    "confirmPassword": "2130"
} 
```

</details>
<details>
<summary>Delete</summary>
Rota: http://127.0.0.1:3000/v1/user/:id

requer JWT

</details>
<details>
<summary>Get</summary>
Rota: http://127.0.0.1:3000/v1/user

requer JWT



</details>




# Rotas categorias

<details>
<summary>Get</summary>
Rota: http://127.0.0.1:3000/v1/category/search
</details>
<details>
<summary>Find</summary>
Rota: http://127.0.0.1:3000/v1/category/:id
</details>
<details>
<summary>Create</summary>
Rota: http://127.0.0.1:3000/v1/category

- requer JWT

payload:

```json
{
  "name": "Shoes",
  "slug": "shoes",
  "use_in_menu": true
}  
```

</details>
<details>
<summary>Update</summary>
Rota: http://127.0.0.1:3000/v1/category/:id

- requer JWT

payload:

```json
{
  "name": "Shoes",
  "slug": "shoes",
  "use_in_menu": true
}  
```

</details>

<details>
<summary>Delete</summary>
Rota: http://127.0.0.1:3000/v1/category/id

requer JWT
</details>


# Rotas Produtos
<details>
<summary>Get</summary>
Rota: http://127.0.0.1:3000/v1/product/search
</details>

<details>
<summary>Find</summary>
Rota: http://127.0.0.1:3000/v1/product/:id
</details>

<details>
<summary>Update</summary>
Rota: http://127.0.0.1:3000/v1/product/:id
</details>

<details>
<summary>Delete</summary>
Rota: http://127.0.0.1:3000/v1/product/:id
</details>

<details>
<summary>Create</summary>
Rota: http://127.0.0.1:3000/v1/product

- requer JWT
requer que seja criado as categorias antes

payload:

```json
 {
    "enabled": true,
    "name": "Produto 01",
    "slug": "produto-01",
    "stock": 10,
    "description": "Descrição do produto 01",
    "price": 119.90,
    "price_with_discount": 99.90,
    "category_ids": [1,2,3],
    "images": [ 
      {
        "type": "image/png",
        "path": "base64 da imagem 1" 
      },
      {
        "type": "image/png",
        "path": "base64 da imagem 2" 
      },
      {
        "type": "image/jpg",
        "path": "base64 da imagem 3" 
      }
    ],
    "options": [
      {
        "title": "Cor",
        "shape": "square",
        "radius": 4,
        "type": "text",
        "values": ["PP", "GG", "M"]
      }
    ]
  }
```

</details>



