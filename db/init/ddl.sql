create database if not exists sampledb character set utf8mb4 collate utf8mb4_bin;

use sampledb;

drop table if exists users;
create table if not exists users
(
  id      int unsigned not null primary key auto_increment,
  name    varchar(128) not null,
  api_key varchar(256) not null,
  unique uniq_api_key (api_key)
) character set utf8mb4 collate utf8mb4_bin;

insert into users (name, api_key)
values ('Tange Junko', 'xrAKJBr7MUxc7asX'),
       ('Matsuda Kouhei', 'iz62Z8pDZ67DI3P+');