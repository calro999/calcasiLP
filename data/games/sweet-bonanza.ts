// このファイルだけで完結するように設定
export type Game = {
  slug: string;
  title: string;
  provider: string;
  imageUrl: string;
  ratingFun: 1 | 2 | 3 | 4 | 5;
  ratingExplosive: 1 | 2 | 3 | 4 | 5;
  canBuyFS: boolean;
  rtp: string;
  maxWin: string;
  volatility: string;
  description: string;
  rules: string;
  features: string;
  strategy: string;
  pros: string[];
  cons: string[];
  seoDescription: string;
  affiliateUrl: string;
};

export const gameData: Game = {
  slug: "sweet-bonanza",
  title: "Sweet Bonanza",
  provider: "Pragmatic Play",
  imageUrl: "/sweet-bonanza.png", // 指示通り slug名.jpg に設定
  ratingFun: 5,
  ratingExplosive: 4,
  canBuyFS: true,
  rtp: "96.48%",
  maxWin: "21,175倍",
  volatility: "Medium-High (中〜高)",
  description: "お菓子とフルーツの世界が舞台の、Pragmatic Playを象徴する大人気スロット。特定のラインに揃える必要がない「どこでも配当」システムと、最大100倍のマルチプライヤー爆弾が絡み合う連鎖爆発が最大の特徴です。見た目の可愛さとは裏腹に、2万倍を超える配当ポテンシャルを秘めたモンスターマシンとして知られています。",
  rules: "【基本システム】\n・6×5のグリッドを使用。画面内に同じシンボルが8個以上出現すれば、場所に関わらず配当が発生します。\n・配当が発生したシンボルは消滅し、新しいシンボルが上から降ってくる「タンブル機能」により、1回のスピンで連続配当が期待できます。\n\n【フリースピン】\n・スキャッター（キャンディー）が4つ以上出現すると10回のフリースピンに突入します。\n・フリースピン中にスキャッターが3つ出ると、追加で5スピンが付与されます。\n\n【マルチプライヤー爆弾】\n・フリースピン中のみ「マルチプライヤー爆弾（虹色の玉）」が出現します。\n・2倍から最大100倍までの数字が書かれており、そのスピンで発生した合計配当にその倍率が掛け合わされます。複数の爆弾が出た場合は、数字が合算されるため、一気に配当が跳ね上がります。",
  features: "このゲームの醍醐味は、フリースピン中の「マルチプライヤーの合算」です。例えば、10ドルの配当が発生したスピンで、「50倍」と「100倍」の爆弾が同時に画面にある場合、配当は150倍（1,500ドル）になります。このシンプルかつ強力な仕組みが、世界中のプレイヤーを虜にしています。",
  strategy: "1. アンティベットの活用：左側のスイッチをONにすることで、ベット額が25%上がりますが、フリースピン突入確率が2倍にアップします。基本的にはONでのプレイを推奨します。\n2. フリースピン購入：早く勝負を決めたい場合は、ベット額の100倍でフリースピンを購入可能です。ボラティリティが中〜高程度なので、100倍のコストを回収できる「50倍以上の爆弾」をいかに早い段階で引けるかが鍵となります。\n3. 配当の傾向：低配当のフルーツで連鎖を繋ぎつつ、マルチプライヤーが乗るのを待つのが王道の勝ちパターンです。高配当シンボルのハート（赤）が絡んだ時に高倍率爆弾を引ければカンストが見えてきます。",
  pros: ["最大100倍のマルチプライヤー爆弾による爆発力", "ラインを気にせず遊べる分かりやすいルール", "フリースピンの購入や突入率アップ機能が充実"],
  cons: ["フリースピン中に爆弾が出ない時の喪失感が大きい", "通常時はマルチプライヤーがないため、じわじわ削られる展開もある"],
  seoDescription: "Sweet Bonanza（スイートボナンザ）の攻略法・フリースピン購入のタイミング・RTP・最大配当を詳しく解説。100倍爆弾を引くためのコツとは？",
  affiliateUrl: "https://record.discasinoaffiliates.com/_R757TaLb9LkdIqIeVhNpQ2Nd7ZgqdRLk/1/?pg=0",
};