import { expect, test } from "vitest";
import { formatDate } from "./formatDate";

test('should return date formatted', async () => {
  const formattedDate = formatDate(new Date())
  expect(formattedDate).toMatch(/^\d{2}:\d{2}$/)
})