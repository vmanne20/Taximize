# NodeJS Express BackEnd

## Technologies
- Node
- Docker
- Express 
- Mongoose/MongoDB

# Connecting to AdminMongo
- if AdminMongo doesn't have connection, add a new connection with "mongo" and "mongodb://mongo:27017/ReTax"
- navigate to http://0.0.0.0:1234/app/mongo/ReTax

## API Endpoints

 - */auth/signin* 
    Request Body:
    ```
        {
            "email": "chrisc98@vt.edu",
            "password": "123456"
        }
    ```
    Request Return:
    ```
        {
            "signed": true
        }
    ```

 - */auth/signup* 
    Request Body:
    ```
        {
            "email": "chrisc98@vt.edu",
            "username": "chrisc98",
            "password": "123456",
            "name": "Christian",
            "state": "VA",
            "zipCode": "24060"
        }
    ```
    Request Return:
    ```
        {
            "signed": true
        }
    ```

 - */auth/signout* 
    Request Body:
    ```
        {
            "session": {

            }
        }
    ```
    Request Return:
    ```
        {
            "signed": false
        }
    ```

 - */add-profile*
    Request Body:
    ```
        {
            "userId": "kl2n45lklk34",
            "category": "personal",
            "description": "Personal Profile for Vamsi Manne"
        }
    ```
    Request Return:
    ```
        {
            "added": true
        }
    ```

 - */get-profile*
    Request Body:
    ```
        {
            "userId": "slkdjfl3knlkd",
            "profileId": "2n3knlkjfk2"
        }
    ```
    Request Return:
    ```
        {
            "profileId": "",
            "name": "",
            "category": "",
            "description": "",
            "expenseList": [...]
        }
    ```

 - */get-all-profiles*
    Request Body:
    ```
        {
            "userId": ""
        }
    ```
    Request Return:
    ```
        [{
            "profileId": "",
            "name": "",
            "category": "",
            "description": "",
            "expenseList": [...]
        },
        {
            ...
        }, 
        {
            ...
        }]
    ```

 - */update-profile*
    Request Body:
    ```
        {
            "userId": "",
            "profile": {
                "profileId": "",
                "name": "",
                "category": "",
                "expenseList": []
            }
        }
    ```
    Request Return:
    ```
        {
            "updated": true
        }
    ```

 - */delete-profile*
    Request Body:
    ```
        {
            "userId": "",
            "profileId": ""
        }
    ```
    Request Return:
    ```
        {
            "deleted": true
        }
    ```

 - */add-expense*
    Request Body:
    ```
        {
            "userId": "",
            "profileId": "",
            "description": "",
            "amount": "",
            "category": "",
            "date": "",
            "location": ""
        }
    ```
    Request Return:
    ```
        {
            "added": true
        }
    ```

 - */get-expense*
    Request Body:
    ```
        {
            "userId": "",
            "profileId": "",
            "expenseId": ""
        }
    ```
    Request Return:
    ```
        {
            "expenseId": "",
            "description": "",
            "amount": "",
            "category": "",
            "date": "",
            "location": ""
        }
    ```

 - */get-all-expenses*
    Request Body:
    ```
        {
            "userId": "",
            "profileId": ""
        }
    ```
    Request Return:
    ```
        [{
            "expenseId": "",
            "description": "",
            "amount": "",
            "category": "",
            "date": "",
            "location": ""
        },
        {
            ...
        },
        {
            ...
        }]
    ```

 - */update-expense*
    Request Body:
    ```
        {
            "userId": "",
            "profileId": "",
            "expense": {
                "expenseId": "",
                "description": "",
                "amount": "",
                "category": "",
                "date": "",
                "location": ""
            }
        }
    ```
    Request Return:
    ```
        {
            "updated": true
        }
    ```

 - */delete-expense*
    Request Body:
    ```
        {
            "userId": "",
            "profileId": "",
            "expenseId": ""
        }
    ```
    Request Return:
    ```
        {
            "deleted": true
        }
    ```