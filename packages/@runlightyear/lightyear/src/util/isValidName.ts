export const validNameRegex = /^[A-Za-z0-9-_]+$/;

export const validVariableAndSecretNameRegex = /^[A-Za-z0-9-_]+\??$/;

export function isValidName(name: string) {
  return validNameRegex.test(name);
}

export function isValidVariableAndSecretName(name: string) {
  return validVariableAndSecretNameRegex.test(name);
}
