import sqlite3

# ---------------- Connect / Create database ----------------
conn = sqlite3.connect("travel_planner.db")
cursor = conn.cursor()

# ---------------- Create Tables ----------------

# Users
cursor.execute("""
CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
)
""")

# Cities
cursor.execute("""
CREATE TABLE IF NOT EXISTS Cities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    cost_index REAL,
    popularity INTEGER
)
""")

# Trips
cursor.execute("""
CREATE TABLE IF NOT EXISTS Trips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT,
    is_public INTEGER DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES Users(id)
)
""")

# Stops
cursor.execute("""
CREATE TABLE IF NOT EXISTS Stops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trip_id INTEGER NOT NULL,
    city_id INTEGER NOT NULL,
    start_date TEXT,
    end_date TEXT,
    order_no INTEGER,
    FOREIGN KEY(trip_id) REFERENCES Trips(id),
    FOREIGN KEY(city_id) REFERENCES Cities(id)
)
""")

# Activities
cursor.execute("""
CREATE TABLE IF NOT EXISTS Activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    type TEXT,
    cost REAL,
    duration REAL,
    FOREIGN KEY(city_id) REFERENCES Cities(id)
)
""")

# Trip_Activities
cursor.execute("""
CREATE TABLE IF NOT EXISTS Trip_Activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stop_id INTEGER NOT NULL,
    activity_id INTEGER NOT NULL,
    day_no INTEGER,
    FOREIGN KEY(stop_id) REFERENCES Stops(id),
    FOREIGN KEY(activity_id) REFERENCES Activities(id)
)
""")

conn.commit()
print("Database and tables created successfully!")

