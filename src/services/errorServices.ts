export default function handleError(code: string) {
  switch (code) {
    case "RegisteredEntity" || "IncorrectCredentials":
      return 401;
    case "ServerProblem":
      return 500;
    case "NotFound":
      return 404;
    case "TitleCreated":
      return 403;
    default:
      return 418;
  }
}
