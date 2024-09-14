export const addEvnetIndexMigration = `
ALTER TABLE event 
ADD INDEX idx_event (event) TYPE set(0) GRANULARITY 8192;
`;