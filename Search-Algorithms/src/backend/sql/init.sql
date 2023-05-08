CREATE DATABASE IF NOT EXISTS "search_algorithms";
drop table if exists state;

CREATE TABLE IF NOT EXISTS state (
    -- create a primary key unique serial ID for each state
    state_id SERIAL PRIMARY KEY,
    -- create a column for the state 's url
    state_code VARCHAR(15) NOT NULL,
    -- create a column for the state 's JSON data
    state_json TEXT NOT NULL
);