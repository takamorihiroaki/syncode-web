/**
 * タグの正規化とスラグ生成を行うユーティリティ
 */

/**
 * 表示用のタグ名をクリーンアップします。
 */
export function normalizeTag(tag: string): string {
  return tag.trim();
}

/**
 * URL用のスラグを生成します。
 * - 小文字化
 * - 前後の空白削除
 * - 記号や空白をハイフンに置換（日本語は維持）
 */
export function tagToSlug(tag: string): string {
  if (!tag) return "";
  
  return tag
    .toLowerCase()
    .trim()
    // Unicodeプロパティを使用して、文字（L）と数字（N）以外をハイフンに置換
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    // 最初と最後のハイフンを削除
    .replace(/^-+|-+$/g, '');
}
