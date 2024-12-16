CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email_id VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL
);

-- Insert sample data
INSERT INTO employees (email_id, first_name, last_name) VALUES
('john.doe@example.com', 'John', 'Doe'),
('jane.smith@example.com', 'Jane', 'Smith'),
('michael.brown@example.com', 'Michael', 'Brown'),
('lisa.jones@example.com', 'Lisa', 'Jones'),
('david.johnson@example.com', 'David', 'Johnson');