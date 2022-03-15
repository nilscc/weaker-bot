create schema if not exists weakdb_2203;

set search_path = weakdb_2203;

begin;

    create table if not exists tells
        ( id            serial primary key
        , date          timestamp not null default now()
        , "from"        text not null
        , "to"          text not null
        , message       text not null
        );

commit;
