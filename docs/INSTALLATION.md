# Installation
Onacut is built using :
* [Laravel](https://laravel.com/)
* [Bootstrap CSS](https://getbootstrap.com/)
* Javascript

## Requirements
* Apache 2.4+ or nginx
* MySQL 5.7.24
* PHP 7.4.13+
* Composer 2
* npm or yarn

## Installation
First, you need to clone the repository (with optional as the name you want to give
to the project)
```bash
    git clone https://github.com/osscameroon/onacut.git <optional>
```

You will need to install dependencies now.
```bash
    composer install
```
And also
```bash
    npm install
```

Now you will have to generate the app key
```bash
    php artisan key:generate
```

And after create a database and set the name in the .env file.
You can now launch by doing :
```bash
    php artisan serve
```

