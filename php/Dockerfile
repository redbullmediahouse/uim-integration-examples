FROM php:7.4-cli
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp

# ZIP needed so that composer can install the dependencies
RUN apt update
RUN apt install zip unzip

# Install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php composer-setup.php --install-dir=/usr/bin/ --filename=composer
RUN rm composer-setup.php
