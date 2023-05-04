CREATE TABLE IF NOT EXISTS state (
    state_id SERIAL NOT NULL,
    state_code VARCHAR(20) NOT NULL,
    state_json JSON NOT NULL,
    PRIMARY KEY(state_id)
);

