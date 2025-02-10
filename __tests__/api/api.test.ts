import { GET } from '@/app/api/dashboard/users/route'
import { GET as GETSession } from '@/app/api/dashboard/[sessionId]/route'
import { describe } from 'node:test'
import { prisma } from 'prisma/test-setup'
import { beforeEach, expect, test } from 'vitest'
import { POST, GET as GETMessage } from '@/app/api/message/[sessionId]/route'
import { POST as POSTUser } from '@/app/api/user/route'

describe('Test dashboard endpoints', () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.message.deleteMany(),
      prisma.session.deleteMany(),
      prisma.user.deleteMany(),
    ])
  })

  test("should return users with sessions", async () => {
    await prisma.user.create({
      data: {
        name: "Test User",
        sessions: {
          create: {
            messages: { create: { content: "How are you?", author: "USER" } },
          },
        },
      },
    })

    const response = await GET()

    expect(response.status).toBe(200)

    const json = await response.json()

    expect(json.status).toBe("Success")
    expect(json.content.length).toBe(1)
    expect(json.content[0].name).toBe("Test User")
    expect(json.content[0].sessions.length).toBe(1)
  })

  test("should get messages from a given sessionId", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Test User"
      }
    })

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        messages: {
          createMany: {
            data: [
              { content: "How are you?", author: "USER" },
              { content: "I'm doing well! and you?", author: "BOT" }
            ]
          }
        },
      },
    })

    const req = new Request("http://localhost:3000/api/session/test-id");
    const response = await GETSession(req, { params: Promise.resolve({ sessionId: session.id }) });

    expect(response.status).toBe(200)

    const json = await response.json()

    expect(json.status).toBe("Success")
    expect(json.content.length).toBe(2)
    expect(json.content[0].sessionId).toBe(session.id)
    expect(json.content[0].author).toBe('USER')
    expect(json.content[1].author).toBe('BOT')
  })
})

describe('Test message endpoints', () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.message.deleteMany(),
      prisma.session.deleteMany(),
      prisma.user.deleteMany(),
    ])
  })

  test("should not create message if 'content' is missing", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Test User"
      }
    })

    const session = await prisma.session.create({
      data: {
        userId: user.id
      }
    })

    const req = new Request("http://localhost:3000/api/session/test-id", {
      method: 'POST',
      body: JSON.stringify({
        sessionId: session.id,
        createdAt: new Date()
      })
    });

    const response = await POST(req)

    expect(response.status).toBe(400)

    const json = await response.json()

    expect(json.message).toBe("'content' and 'sessionId' are required")
    expect(json.status).toBe('Error')
  })

  test("should not create message if 'sessionId' is missing", async () => {
    const req = new Request("http://localhost:3000/api/session/test-id", {
      method: 'POST',
      body: JSON.stringify({
        content: "Hello",
        createdAt: new Date()
      })
    });

    const response = await POST(req)

    expect(response.status).toBe(400)

    const json = await response.json()

    expect(json.message).toBe("'content' and 'sessionId' are required")
    expect(json.status).toBe('Error')
  })

  test("should create message if all required params is present", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Test User"
      }
    })

    const session = await prisma.session.create({
      data: {
        userId: user.id
      }
    })

    const req = new Request("http://localhost:3000/api/session/test-id", {
      method: 'POST',
      body: JSON.stringify({
        content: "Hello",
        sessionId: session.id,
        createdAt: new Date()
      })
    });

    const response = await POST(req)

    expect(response.status).toBe(201)

    const json = await response.json()

    expect(json.status).toBe('Success')
    expect(json.content.length).toBe(2)
    expect(json.content[0].sessionId).toBe(session.id)
    expect(json.content[0].author).toBe('USER')
    expect(json.content[0].content).toBe('Hello')

    expect(json.content[1].sessionId).toBe(session.id)
    expect(json.content[1].author).toBe('BOT')
  })

  test("should get session if sessionId exist", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Test User #1"
      }
    })

    const session = await prisma.session.create({
      data: {
        userId: user.id,
      },
    })

    const req = new Request("http://localhost:3000/api/message/test-id");
    const response = await GETMessage(req, { params: Promise.resolve({ sessionId: session.id }) });

    expect(response.status).toBe(200)

    const json = await response.json()

    expect(json.status).toBe('Success')
    expect(json.content.session.id).toBeTruthy()
    expect(json.content.session.userId).toBe(user.id)
  })

  test("should not get session if sessionId don't exist", async () => {
    const req = new Request("http://localhost:3000/api/message/test-id");
    const response = await GETMessage(req, { params: Promise.resolve({ sessionId: 'randomSessionId' }) });

    expect(response.status).toBe(404)

    const json = await response.json()

    expect(json.status).toBe('Error')
    expect(json.message).toBe('Session not found')
  })

  test("should not get session if sessionId is not present", async () => {
    const req = new Request("http://localhost:3000/api/message/test-id");
    const response = await GETMessage(req, { params: Promise.resolve({ sessionId: '' }) });

    expect(response.status).toBe(400)

    const json = await response.json()

    expect(json.status).toBe('Error')
    expect(json.message).toBe('sessionId is required')
  })

  test("should get internal server error if body is not present", async () => {
    const req = new Request("http://localhost:3000/api/session/test-id", {
      method: 'POST',
      body: null
    });
    const response = await POSTUser(req)

    expect(response.status).toBe(500)

    const json = await response.json()

    expect(json.status).toBe('Error')
  })
})

describe('Test user endpoints', () => {
  beforeEach(async () => {
    await prisma.$transaction([
      prisma.message.deleteMany(),
      prisma.session.deleteMany(),
      prisma.user.deleteMany(),
    ])
  })

  test("should not create user if userName is missing", async () => {
    const req = new Request("http://localhost:3000/api/session/test-id", {
      method: 'POST',
      body: JSON.stringify({
        userName: ''
      })
    });

    const response = await POSTUser(req)

    expect(response.status).toBe(400)

    const json = await response.json()

    expect(json.status).toBe('Error')
    expect(json.message).toBe("Name is required")
  })

  test("should return user if it exist", async () => {
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        sessions: {
          create: {
            messages: { create: { content: "How are you?", author: "USER" } },
          },
        },
      },
    })

    const req = new Request("http://localhost:3000/api/session/test-id", {
      method: 'POST',
      body: JSON.stringify({
        userName: 'Test User'
      })
    });

    const response = await POSTUser(req)

    expect(response.status).toBe(200)

    const json = await response.json()

    expect(json.status).toBe('Success')
    expect(json.content.user.id).toBeTruthy()
    expect(json.content.user.name).toBe('Test User')
    expect(json.content.session.userId).toBe(user.id)
  })

  test("should create user if it don't exist", async () => {
    const req = new Request("http://localhost:3000/api/session/test-id", {
      method: 'POST',
      body: JSON.stringify({
        userName: 'New User'
      })
    });

    const response = await POSTUser(req)

    expect(response.status).toBe(201)

    const json = await response.json()

    expect(json.status).toBe('Success')
    expect(json.content.user.id).toBeTruthy()
    expect(json.content.user.name).toBe('New User')
  })

  test("should get internal server error if body is not present", async () => {
    const req = new Request("http://localhost:3000/api/session/test-id", {
      method: 'POST',
      body: null
    });

    const response = await POSTUser(req)

    expect(response.status).toBe(500)

    const json = await response.json()

    expect(json.status).toBe('Error')
  })
})