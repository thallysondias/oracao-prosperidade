interface OpenContentAccessInput {
  isAuthenticated: boolean;
}

export function hasOpenContentAccess({ isAuthenticated }: OpenContentAccessInput) {
  return isAuthenticated;
}
