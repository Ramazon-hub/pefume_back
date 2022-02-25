CREATE DATABASE perfume;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    user_id uuid NOT NULL default uuid_generate_v4() PRIMARY KEY,
    user_firstname varchar(100) not null,
    user_lastname varchar(100) not null,
    user_sortname varchar(100) not null,
    user_passport_seria varchar(50) not null,
    user_passport_berilgan varchar(100) not null,
    user_inn int not null,
    user_tell varchar(50) not null,
    user_email varchar(50) unique not null,
    user_password text not null,
    user_cod_id int not null,
    user_visa_number bigint default null,
    user_visa_sroc int default null,
    user_visa_three_num int default null,
    user_date timestamp with time zone not null default current_timestamp,
    user_status boolean default true,
    user_ref uuid default null,
    CONSTRAINT fk_user_ref
        FOREIGN KEY(user_ref)
            REFERENCES users(user_id)
            ON DELETE CASCADE
);