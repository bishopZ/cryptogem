create table messages(
    title varchar(255) PRIMARY KEY,
    message text NOT NULL,
    hint text,
    public boolean default false NOT NULL
);

