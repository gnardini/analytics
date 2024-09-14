export const createEventsMigration = `
CREATE TABLE event (
    user_id String,
    organization_id String,
    session_id String,
    created_at DateTime,
    date Date MATERIALIZED toDate(created_at),
    
    event String, 
    data String,
    extra_data String,
    
    device LowCardinality(String),
    browser LowCardinality(String),
    country LowCardinality(String),
    location String,
    language String,
    referrer String
)
ENGINE = MergeTree()
PRIMARY KEY (organization_id, created_at)
ORDER BY (organization_id, created_at)
PARTITION BY toYYYYMM(created_at)
`;
