// TODO: 1. 下記の関数にTypescriptの型定義を追加してください
const getTag = (value: any): string => {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value)
}

type checkType = (value: any) => boolean

const isNull: checkType = (value) => {
  return value === null
}

const isString: checkType = (value) => {
  const type = typeof value
  return (
    type === 'string' ||
    (type === 'object' &&
      value != null &&
      !Array.isArray(value) &&
      getTag(value) == '[object String]')
  )
}

const isNumber: checkType = (value) => {
  return (
    typeof value === 'number' ||
    (typeof value === 'object' &&
      value !== null &&
      getTag(value) == '[object Number]')
  )
}

const isObject: checkType = (value) => {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

const isBoolean: checkType = (value) => {
  return (
    value === true ||
    value === false ||
    (typeof value === 'object' &&
      value !== null &&
      getTag(value) == '[object Boolean]')
  )
}

// --------------------------------------------------------------------------------

// TODO: 2. 下記のクラスに TSDocを追加してください（フォーマットについては、別添の tsdocSample.ts ファイルをご参照ください
/**
 * ## LocalStorage クラス
 * - TSDoc ローカルストレージ用のクラス
 */
class LocalStorage {
  /**
   * ## LocalStorage.storage
   * - TSDoc ローカルストレージ用のクラス変数
   * - 実行環境がブラウザであればローカルストレージを取得。それ以外はnull
   *
   */
  static storage = typeof window !== 'undefined' ? window.localStorage : null

  /**
   * ## LocalStorage.getItem()
   * - TSDoc ローカルストレージ用のクラスメソッド
   *
   * > ローカルストレージの値がnull以外なら引数keyに対応するvalueを取得し、JavaScriptオブジェクトに変換する
   *
   * > 値がnullの場合、nullを返す
   *
   * ---
   * ### Args
   * @param key TSDoc ローカルストレージのkeyを参照する引数
   *
   * ### Return
   * 返却値の詳細
   * > - @return ( ReturnType | null )
   *
   * ReturnTypeまたはnullを返す
   *
   * > { key: string, value: string | number | object | boolean }
   */
  static getItem<ReturnType>(key: string): ReturnType | null {
    if (isNull(this.storage)) return null
    const value = this.storage.getItem(key)
    return this.parseItem<ReturnType>(value)
  }

  /**
   * ## LocalStorage.setItem()
   * - TSDoc ローカルストレージ用のクラスメソッド
   *
   * > ローカルストレージの値がnull以外なら引数valueを加工し、ローカルストレージに保存する
   *
   * > 値がnullの場合、nullを返す
   *
   * ---
   * ### Args
   * @param key TSDoc ローカルストレージ保存時のオブジェクトのkey
   * @param value TSDoc ローカルストレージ保存時のオブジェクトのvalue
   *
   * ### Return
   * 返却値の詳細
   * > - @return ( string | number | object | boolean )
   *
   * string, number, object, booleanのいずれかを返す
   *
   * ### Error
   * @throws エラーメッセージをスローする
   *
   * エラーの詳細はコンソールで確認可
   *
   */
  static setItem(key: string, value: string | number | object | boolean) {
    if (isNull(this.storage)) return false
    try {
      let conversionValue = ''
      if (isString(value)) conversionValue = value
      if (isNumber(value) || isBoolean(value)) conversionValue = String(value)
      if (isObject(value)) conversionValue = JSON.stringify(value)

      this.storage.setItem(key, conversionValue)
      return value
    } catch (error) {
      console.error(error)
      return false
    }
  }

  /**
   * ## LocalStorage.removeItem()
   * - TSDoc ローカルストレージ用のクラスメソッド
   *
   * > ローカルストレージの値がnull以外なら引数に渡されたkeyに該当するアイテムをローカルストレージから削除する
   *
   * > 値がnullの場合、処理を終了
   *
   * ---
   * ### Args
   * @param key TSDoc ローカルストレージにあるkeyを検索する引数
   *
   * ### Return
   * 返却値の詳細
   *
   * 返り値なし
   */
  static removeItem(key: string): void {
    if (isNull(this.storage)) return
    this.storage.removeItem(key)
  }

  /**
   * ## LocalStorage.parseItem() - @private
   * - TSDoc ローカルストレージ用のプライベートクラスメソッド
   *
   * > 引数valueをJSONからJavaScriptオブジェクトに変換する
   *
   * > 引数valueがnullの場合もしくはエラーが発生した場合、nullを返す
   *
   * ---
   * ### Args
   * @param value TSDoc ローカルストレージ用のJSONオブジェクト引数
   *
   * ### Return
   * 返却値の詳細
   * > - @return ( ReturnType | null )
   *
   *  ReturnTypeもしくはnullを返す
   *
   * ### Error
   * @throws エラーメッセージをスローする
   *
   * エラーの詳細はコンソールで確認可
   *
   */
  private static parseItem<ReturnType>(
    value: string | null
  ): ReturnType | null {
    if (isNull(value)) return null

    try {
      return JSON.parse(value)
    } catch (error) {
      console.error(error)
      return null
    }
  }

// --------------------------------------------------------------------------------

// TODO: 3. 下記のa~dの対応をお願いします。
// a. フロントエンドのフレームワーク（React.js, Vue.js, Angular など）を初期で立ち上げてください
// b. その上で、ページ上にボタンを1つ作成してください
// c. ボタンをクリックしたタイミングで、一般に公開されているAPI（個人で作成したものでなければどれでもOK）からデータを取得してください
// d. 上記で取得したデータをHTML上に表示してください
// e. 外部からアクセス可能なgitリポジトリにプッシュしてください

// TODO: 3は以下のリポジトリへ
// https://github.com/KobeanH/skill_check
