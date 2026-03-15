# Booking System: CRUD Operations Data Flow

This document models the data flow for Create, Read, Update, and Delete operations in Phase 6 of the Booking System.

## 1. CREATE (C)

```mermaid
sequenceDiagram
    participant User as User (Browser)
    participant UI as Frontend (JS)
    participant API as Backend (Express)
    participant DB as PostgreSQL

    User->>UI: Fills form & Clicks "Save"
    UI->>API: POST /api/resources (Payload: JSON)
    
    alt Success
        API->>DB: INSERT INTO resources...
        DB-->>API: Returns new record
        API-->>UI: 201 Created (JSON: {ok: true, data: {...}})
        UI-->>User: Shows success message & updates list
    else Validation Fails (e.g. Missing name)
        API-->>UI: 400 Bad Request (JSON: {ok: false, error: "..."})
        UI-->>User: Shows validation error message
    end
```

## 2. READ (R)

```mermaid
sequenceDiagram
    participant User as User (Browser)
    participant UI as Frontend (JS)
    participant API as Backend (Express)
    participant DB as PostgreSQL

    User->>UI: Opens page / Refreshes
    UI->>API: GET /api/resources
    
    alt Success
        API->>DB: SELECT * FROM resources
        DB-->>API: Returns rows
        API-->>UI: 200 OK (JSON: {ok: true, data: [...]})
        UI-->>User: Renders list of resources
    else Server/Database Error
        API-->>UI: 500 Internal Server Error
        UI-->>User: Shows "Failed to load data" error
    end
```

## 3. UPDATE (U)

```mermaid
sequenceDiagram
    participant User as User (Browser)
    participant UI as Frontend (JS)
    participant API as Backend (Express)
    participant DB as PostgreSQL

    User->>UI: Edits resource & Clicks "Save"
    UI->>API: PUT /api/resources/:id (Payload: JSON)
    
    alt Success
        API->>DB: UPDATE resources SET... WHERE id = :id
        DB-->>API: Returns updated record
        API-->>UI: 200 OK (JSON: {ok: true, data: {...}})
        UI-->>User: Updates UI with new data
    else Validation Error
        API-->>UI: 400 Bad Request
        UI-->>User: Shows validation error
    else Not Found
        API-->>UI: 404 Not Found
        UI-->>User: Shows "Resource not found"
    end
```

## 4. DELETE (D)

```mermaid
sequenceDiagram
    participant User as User (Browser)
    participant UI as Frontend (JS)
    participant API as Backend (Express)
    participant DB as PostgreSQL

    User->>UI: Clicks "Delete" & Confirms
    UI->>API: DELETE /api/resources/:id
    
    alt Success
        API->>DB: DELETE FROM resources WHERE id = :id
        DB-->>API: Confirms deletion
        API-->>UI: 200 OK (or 204 No Content)
        UI-->>User: Removes item from UI list
    else Resource Not Found
        API-->>UI: 404 Not Found
        UI-->>User: Shows error "Item already deleted"
    end
```