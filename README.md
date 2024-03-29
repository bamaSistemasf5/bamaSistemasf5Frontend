<img src="https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/76/7634c55c-1833-4031-becd-2234293a5d48?jwt=eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1Mjc1OTQ1MzYsInJxcyI6IkdFVFxcL3RlbmFudHMvYzdlMmI5YzEtODQ4MC00M2IwLWFkOWUtMDAwYzE3YWEyY2JiL2RvbWFpbnMvNzE4MzAyYjYtNTM0My00M2QzLWE4YTMtODI5ZGMzZGEwODkzL2J1Y2tldHMvNmYzYWIxY2MtNTkyMC00ZjRlLWIxMzEtNDZhNDU4N2EwZTFmL2ltYWdlcy83Ni83NjM0YzU1Yy0xODMzLTQwMzEtYmVjZC0yMjM0MjkzYTVkNDgiLCJtZXRhZGF0YSI6eyJydWxlIjp7InZlcnNpb24iOiIyMDE2LTEwIiwiYWN0aW9ucyI6W119fX0.jt5toj8fczJewJ3u_QmsddrVyhoCt67OAmxbp2VtDQQhWAyfByBSzVYzUQ3jORCmOCvHUWnhlWaElTL66uF0q-BpyKG4FH68fgAPi_eBZiZ2HJhB6WdFzp42PfzZVzxITdmaZGIoMQ7avgbPjBFS2lBtLdqK2Zq7HK-Hp-ID0Jtqqq1L4NQ7Fyq2g5tW3C435yJHMSFRarXhSry3zixf8k4y9dlj-YWNVT8uz_wzD2vnqK7X5vzweemGg6E_tYa9sItihtCHyX9n7szGFq0hfJO32yk3wq-dkfSTP84cQ608-wZec6sG1r5z7wUrAI_pEVeJUBpU1nQ3HZC6cyIGXw&AccessKeyId=d724d9a53d95a810" alt="bamas sistemas png" width="250px">

# Facturación- BAMA

Este es un proyecto desarrollado para la empresa BAMA con el objetivo de crear un sistema para el registro y control de la facturación. El sistema permite la gestión de clientes, pedidos, albaranes y facturas, manteniendo un seguimiento detallado de cada transacción.

## Funciones Principales

### 1. Crear Cliente

Permite la creación y gestión de clientes, incluyendo datos como nombre, dirección, CIF y forma de pago. Los clientes pueden ser activados o inactivados según sea necesario.

### 2. Crear Pedido

Permite registrar los pedidos recibidos de los clientes, incluyendo información como número de pedido, fecha, importe y adjuntar archivos PDF.

### 3. Crear Albarán

Registra los albaranes de entrega asociados a los pedidos, con información como número de albarán, cliente, fecha, importe, y adjuntar archivos PDF o Word del albarán de entrega y el albarán firmado.

### 4. Crear Factura

Permite generar facturas a partir de los pedidos y albaranes correspondientes, con datos como número de factura, cliente, CIF, fecha, vencimiento, base imponible, tipo de IVA, importe del IVA, total factura, estado y fecha de cobro. También permite adjuntar archivos de factura (Word o PDF).

## Listados y Funcionalidades

- **Listado de Facturas**: Permite buscar, ordenar, generar nuevas facturas, editar y descargar ficheros de factura.
- **Listado de Albaranes**: Similar al listado de facturas pero para albaranes, con la posibilidad de buscar, ordenar, generar nuevos albaranes, editar y descargar ficheros de albarán.
- **Listado de Pedidos**: Permite buscar, ordenar, generar nuevos pedidos, editar y descargar ficheros de pedidos. Además, muestra el estado del pedido, las facturas y albaranes correspondientes.
- **Panel de Control**: Ofrece gráficas que muestran el estado general de la facturación, incluyendo el estado de la facturación mensual y anual, comparativa mensual, y el estado de los pedidos.

## Requisitos

- Node.js
- Base de Datos (se debe especificar el tipo de base de datos y su configuración)

## Instalación

1. Clonar el repositorio desde [URL_DEL_REPOSITORIO].
2. Instalar las dependencias utilizando `npm install`.
3. Configurar la base de datos según las instrucciones proporcionadas.
4. Ejecutar el servidor con `npm start`.

# git branches
   ![Badge en Desarollo](https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green)


| BRANCH   | Description                                                                           |
| -------- | ------------------------------------------------------------------------------------- |
| main     | Rama principal. Aquí alojamos solo los resultados finales                             |                   
| develop      | Rama de frontend|
| origin/Login| Rama de frontend|
| origin/component/Sidebar| Rama de frontend|
| origin/component/clients-view  | Rama de frontend|
| origin/component/create-client| Rama de frontend|
| origin/component/dashboard| Rama de frontend|
| origin/component/detail  | Rama de frontend|
| origin/component/header| Rama de frontend|
| origin/component/login | Rama de frontend|
| origin/cypress-test | Rama de frontend|
| origin/page/delivery-notes-crud| Rama de frontend|
| origin/page/invoices-crud | Rama de frontend|
| origin/page/orders-crud | Rama de frontend|
| origin/page/page/update-client | Rama de frontend|
| origin/readme | Rama de frontend|

 # Technologias usadas
 
<br>
<a href="#"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&amp;logo=javascript&amp;logoColor=white&amp;labelColor=101010" alt="JavaScript"></a>
<br>
<a href="#"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&amp;logo=firebase&amp;logoColor=white&amp;labelColor=101010" alt="Firebase"></a>
<a href="#"><img src="https://img.shields.io/badge/Node.JS-339933?style=for-the-badge&amp;logo=node.js&amp;logoColor=white&amp;labelColor=101010" alt="Node.js"></a>
<a href="#"><img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&amp;logo=mysql&amp;logoColor=white&amp;labelColor=101010" alt="MySQL"></a>
<br>
<a href="#"><img src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&amp;style=for-the-badge&amp;logo=html5&amp;logoColor=white&amp;labelColor=101010" alt="HTML"></a>
<a href="#"><img src="https://img.shields.io/badge/css3%20-%231572B6.svg?&amp;style=for-the-badge&amp;logo=css3&amp;logoColor=white&amp;labelColor=101010" alt="CSS3"></a>
<p></p>
<h4 id="frameworks">Frameworks</h4>
<p><a href="#"><img src="https://img.shields.io/badge/nodejs%20-%23DD0031.svg?&amp;style=for-the-badge&amp;logo=nodejs&amp;logoColor=white&amp;labelColor=101010" alt="NodeJS"></a>
<a href="#"><img src="https://img.shields.io/badge/bootstrap%20-%23563D7C.svg?&amp;style=for-the-badge&amp;logo=bootstrap&amp;logoColor=white&amp;labelColor=101010" alt="Bootstrap"></a>
<a href="#"><img src="https://img.shields.io/badge/react%20-%2320232a.svg?&amp;style=for-the-badge&amp;logo=react&amp;logoColor=%2361DAFB&amp;labelColor=101010" alt="React"></a>
<a href="#"><img src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&amp;style=for-the-badge&amp;labelColor=101010" alt="Express.js"></a>
</p><p></p>
<h4 id="version-control">Version Control</h4>
<p><a href="#"><img src="https://img.shields.io/badge/git%20-%23F05033.svg?&amp;style=for-the-badge&amp;logo=git&amp;logoColor=white&amp;labelColor=101010" alt="Git"></a>
<a href="#"><img src="https://img.shields.io/badge/github%20-%23121011.svg?&amp;style=for-the-badge&amp;logo=github&amp;logoColor=whit&amp;logoColor=white&amp;labelColor=101010" alt="Github"></a></p>
<h3 id="containerization">Containerization</h3>
<p><a href="#"><img src="https://img.shields.io/badge/docker%20-%23F05033.svg?&amp;style=for-the-badge&amp;logo=docker&amp;logoColor=white&amp;labelColor=101010" alt="Docker"></a></p>


# Planificación

- Planificación de tareas en Trello
- Creación de prototipos en Figma.
- Respiración
- A diario
- Reunión de apiladores.

# Nuestro equipo

- Amanda Rodriguez(https://github.com/amanda1686)
- Abelardo Acosta(https://github.com/Moriarty369)
- Alejandro Vargas(https://github.com/AlejoxVargas)
- Lean Montoya(https://github.com/leamontoya19)
- Luis Alvarez(https://github.com/luisangelalvarez)

## Licencia

Este proyecto está bajo la Licencia. Para más detalles, por favor consulta el archivo LICENSE.

## Contribuyendo

Para contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit de ellos (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios al repositorio (`git push origin feature/nueva-funcionalidad`).
5. Crea un nuevo Pull Request.
