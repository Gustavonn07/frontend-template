/**
 * Service responsável por encapsular o acesso ao `localStorage`.
 *
 * Este service:
 * - Centraliza operações de leitura, escrita e limpeza
 * - Trata erros internos sem quebrar a aplicação
 * - Loga todos os erros no console para facilitar debugging
 * - Retorna `undefined` quando o valor não existe ou é inválido
 *
 * Ideal para uso como camada de infraestrutura (lib),
 * sem dependência de React ou framework.
 */
export class LocalStorageService {
  /**
   * Obtém um valor do `localStorage` a partir de uma chave.
   *
   * - Retorna `undefined` se a chave não existir
   * - Retorna `undefined` se o valor armazenado for inválido (JSON malformado)
   * - Loga qualquer erro ocorrido no console
   *
   * @param key - Chave utilizada para buscar o valor no localStorage
   * @returns O valor parseado ou `undefined`
   */
  static getValueByKey<T = unknown>(key: string): T | undefined {
    try {
      const stored = localStorage.getItem(key)

      if (stored === null) {
        return undefined
      }

      return JSON.parse(stored) as T
    } catch (err) {
      console.error(
        `[LocalStorageService] Error getting value by key "${key}"`,
        err
      )
      return undefined
    }
  }

  /**
   * Armazena um valor no `localStorage` associado a uma chave.
   *
   * - O valor é serializado usando `JSON.stringify`
   * - Caso ocorra algum erro (ex: quota excedida), o erro é logado
   *
   * @param params.key - Chave utilizada para salvar o valor
   * @param params.value - Valor a ser armazenado (serializável em JSON)
   */
  static setValueByKey<T>({
    key,
    value,
  }: {
    key: string
    value: T
  }): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.error(
        `[LocalStorageService] Error setting value by key "${key}"`,
        err
      )
    }
  }

  /**
   * Remove um valor específico do `localStorage` a partir da chave.
   *
   * - Caso a chave não exista, nenhuma ação é realizada
   * - Loga erros no console se ocorrerem
   *
   * @param key - Chave do valor a ser removido
   */
  static clearValueByKey(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (err) {
      console.error(
        `[LocalStorageService] Error clearing value by key "${key}"`,
        err
      )
    }
  }

  /**
   * Remove **todos** os valores armazenados no `localStorage`.
   *
   * ⚠️ Atenção:
   * - Remove todas as chaves do domínio atual
   * - Deve ser usado com cuidado
   *
   * Loga erros no console caso ocorram.
   */
  static clearAll(): void {
    try {
      localStorage.clear()
    } catch (err) {
      console.error('[LocalStorageService] Error clearing localStorage', err)
    }
  }
}
