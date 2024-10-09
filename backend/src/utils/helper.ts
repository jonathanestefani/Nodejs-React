export class Helpers {
  static normalize(str: string) {
    return String(str)
      .replace(/[áàãâäÁÀÃÂÄ]/g, 'A')
      .replace(/[éèêëÉÈÊË]/g, 'E')
      .replace(/[íìîïÍÌÎÏ]/g, 'I')
      .replace(/[óòõôöÓÒÕÔÖ]/g, 'O')
      .replace(/[úùûüÚÙÛÜ]/g, 'U')
      .replace(/[ñÑ]/g, 'N')
      .replace(/[çÇ]/g, 'C')
      .toUpperCase()
      .replace(/[^A-Z]/g, '');
  }

  static removerCaracteresEspeciais(value: string) {
    // Expressão regular para remover todos os caracteres que não são dígitos
    const regex = /\D/g;

    // Remove os caracteres especiais e retorna apenas os dígitos
    return value.replace(regex, '');
  }
}
