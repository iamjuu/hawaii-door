# Doors API Documentation

This document describes the API endpoints for managing doors in the Hawaii Door Products system.

## Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [Door Types](#door-types)
- [Admin Endpoints](#admin-endpoints)
- [Public Endpoints](#public-endpoints)
- [Data Models](#data-models)
- [Examples](#examples)

---

## Overview

The Doors API allows you to manage interior and exterior doors with various types, specifications, and inventory status.

**Base URL:** `/api`

---

## Authentication

Admin endpoints require authentication using an `adminToken` cookie. Public endpoints do not require authentication.

---

## Door Types

### Interior Door Types
- Interior Panel Doors
- Bifold Doors
- Primed Interior Panel Doors
- Primed Bifold Doors
- Louver Doors and Bifold Doors
- Interior Barn Doors
- Interior French Doors
- Primed Interior French Doors
- 20-Minute Fire Doors
- 20-Minute Fire Doors Primed

### Exterior Door Types
- Contemporary Collection
- Craftsman Collection
- Exterior French Doors
- Waterbarrier
- Entry Doors
- Half Lite Doors
- Exterior Panel Doors

---

## Admin Endpoints

### 1. Create a New Door

**Endpoint:** `POST /api/admin/doors`

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "name": "Premium Oak Interior Panel Door",
  "price": 299.99,
  "category": "interior",
  "doorType": "Interior Panel Doors",
  "imageUrl": ["base64_string_1", "base64_string_2"]
}
```

**Required Fields:**
- `name` (string): Door name
- `price` (number): Price in dollars (will be converted to cents)
- `category` (string): "interior" or "exterior"
- `doorType` (string): Must match one of the valid door types for the category
- `imageUrl` (array): Array of base64 image strings (at least one image required)

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Door created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Premium Oak Interior Panel Door",
    "price": 29999,
    "category": "interior",
    "doorType": "Interior Panel Doors",
    "imageUrl": ["base64_string_1", "base64_string_2"],
    "createdAt": "2026-01-11T10:30:00.000Z",
    "updatedAt": "2026-01-11T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Missing required fields or invalid data
- `403 Forbidden`: Not authenticated as admin

---

### 2. Get All Doors (Admin)

**Endpoint:** `GET /api/admin/doors`

**Authentication:** Required (Admin)

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20)
- `category` (string, optional): Filter by "interior" or "exterior"
- `doorType` (string, optional): Filter by specific door type
- `inStock` (boolean, optional): Filter by stock status

**Example Request:**
```
GET /api/admin/doors?page=1&limit=10&category=interior&inStock=true
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Premium Oak Interior Panel Door",
      "price": 29999,
      "category": "interior",
      "doorType": "Interior Panel Doors",
      "inStock": true,
      "createdAt": "2026-01-11T10:30:00.000Z",
      "updatedAt": "2026-01-11T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

### 3. Get Single Door (Admin)

**Endpoint:** `GET /api/admin/doors/:id`

**Authentication:** Required (Admin)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Premium Oak Interior Panel Door",
    "description": "High-quality oak door with elegant panel design",
    "price": 29999,
    "category": "interior",
    "doorType": "Interior Panel Doors",
    "material": "Oak",
    "dimensions": "36 x 80 inches",
    "color": "Natural",
    "inStock": true,
    "imageUrl": ["base64_string_1"],
    "createdAt": "2026-01-11T10:30:00.000Z",
    "updatedAt": "2026-01-11T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Invalid door ID
- `404 Not Found`: Door not found

---

### 4. Update Door

**Endpoint:** `PUT /api/admin/doors/:id`

**Authentication:** Required (Admin)

**Request Body:** (All fields optional, only send fields to update)
```json
{
  "name": "Updated Door Name",
  "price": 349.99,
  "imageUrl": ["new_base64_string"]
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Door updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Updated Door Name",
    "price": 34999,
    "imageUrl": ["new_base64_string"],
    "updatedAt": "2026-01-11T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Invalid door ID or data
- `404 Not Found`: Door not found

---

### 5. Delete Door

**Endpoint:** `DELETE /api/admin/doors/:id`

**Authentication:** Required (Admin)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Door deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Premium Oak Interior Panel Door"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Invalid door ID
- `404 Not Found`: Door not found

---

### 6. Delete All Doors

**Endpoint:** `DELETE /api/admin/doors`

**Authentication:** Required (Admin)

**⚠️ Warning:** This endpoint deletes ALL doors. Use with extreme caution!

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Deleted 45 doors",
  "data": {
    "deletedCount": 45
  }
}
```

---

## Public Endpoints

### 1. Get All Doors (Public)

**Endpoint:** `GET /api/doors`

**Authentication:** Not required

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 20)
- `category` (string, optional): Filter by "interior" or "exterior"
- `doorType` (string, optional): Filter by specific door type
- `inStock` (boolean, optional): Filter by stock status
- `excludeImages` (boolean, optional): Exclude image data for faster loading

**Example Request:**
```
GET /api/doors?category=exterior&inStock=true&excludeImages=true
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Contemporary Entry Door",
      "price": 49999,
      "category": "exterior",
      "doorType": "Contemporary Collection",
      "inStock": true,
      "hasImage": true,
      "createdAt": "2026-01-11T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 15,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

---

### 2. Get Single Door (Public)

**Endpoint:** `GET /api/doors/:id`

**Authentication:** Not required

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Contemporary Entry Door",
    "description": "Modern design with sleek lines",
    "price": 49999,
    "category": "exterior",
    "doorType": "Contemporary Collection",
    "material": "Steel",
    "dimensions": "42 x 96 inches",
    "color": "Black",
    "inStock": true,
    "imageUrl": ["base64_string"],
    "createdAt": "2026-01-11T10:30:00.000Z",
    "updatedAt": "2026-01-11T10:30:00.000Z"
  }
}
```

---

## Data Models

### Door Schema

```typescript
interface Door {
  _id: string;
  name: string;
  description?: string;
  price: number; // In cents (e.g., 29999 = $299.99)
  category: "interior" | "exterior";
  doorType: InteriorDoorType | ExteriorDoorType;
  material?: string;
  dimensions?: string;
  color?: string;
  inStock?: boolean;
  imageUrl: string[]; // Required - at least one image
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Examples

### Example 1: Create an Interior Door

```javascript
const response = await fetch('/api/admin/doors', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Classic Bifold Door',
    price: 199.99,
    category: 'interior',
    doorType: 'Bifold Doors',
    imageUrl: ['base64_image_string_here']
  })
});

const result = await response.json();
console.log(result);
```

### Example 2: Get Exterior Doors in Stock

```javascript
const response = await fetch('/api/doors?category=exterior&inStock=true&page=1&limit=10');
const result = await response.json();

console.log(`Found ${result.pagination.total} exterior doors in stock`);
result.data.forEach(door => {
  console.log(`${door.name} - $${door.price / 100}`);
});
```

### Example 3: Update Door Price

```javascript
const doorId = '507f1f77bcf86cd799439011';
const response = await fetch(`/api/admin/doors/${doorId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    price: 249.99
  })
});

const result = await response.json();
console.log(result.message); // "Door updated successfully"
```

### Example 4: Filter Doors by Type

```javascript
// Get all Interior French Doors
const response = await fetch('/api/doors?category=interior&doorType=Interior French Doors');
const result = await response.json();

console.log(`Found ${result.data.length} Interior French Doors`);
```

---

## Notes

1. **Price Format**: Prices are stored in cents (smallest currency unit). When sending prices, use dollars (e.g., 299.99), and the API will convert to cents (29999).

2. **Images (Required)**: Images are stored as base64 strings in the `imageUrl` array. At least one image is required when creating a door. For performance, use the `excludeImages=true` parameter when fetching lists.

3. **Validation**: The API validates that door types match their categories. You cannot create an interior door with an exterior door type, and vice versa.

4. **Pagination**: All list endpoints support pagination. Default is 20 items per page.

5. **Filtering**: Multiple filters can be combined in query parameters.

6. **Simplified Fields**: The door system now focuses on essential fields: name, price, category, door type, and images. Other fields (description, material, dimensions, color, inStock) are optional and maintained for backward compatibility.

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized
- `403`: Forbidden (admin access required)
- `404`: Not Found
- `500`: Server Error

