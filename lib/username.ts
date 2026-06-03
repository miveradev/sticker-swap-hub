export const USERNAME_MIN = 3
export const USERNAME_MAX = 20
const USERNAME_REGEX = /^[a-z0-9_]+$/

export function isValidUsername(username: string): boolean {
  return (
    typeof username === "string" &&
    username.length >= USERNAME_MIN &&
    username.length <= USERNAME_MAX &&
    USERNAME_REGEX.test(username)
  )
}
