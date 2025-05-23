import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Check, ExternalLink } from "lucide-react"
import ScrollAnimation from "@/components/animations/scroll-animation"
import Shimmer from "@/components/animations/shimmer"
import Particles from "@/components/animations/particles"

// ここに複数のカジノデータを定義します。
// 実際のアプリケーションでは、これはデータベースや外部APIから取得されるデータに置き換わります。
const casinoData = [
  {
    id: "wonder",
    name: "ワンダーカジノ",
    logo: "/wan.png?height=200&width=400", // 実際のロゴパスに
    banner: "/wan.png?height=600&width=1200", // 実際のバナーパスに
    bonus: "登録ボーナス$30！初回入金100%ボーナス（最大$500）",
    rating: 4.8,
    description: "初心者にも優しい充実のサポートと、幅広いゲームラインナップが魅力のワンダーカジノ。登録ボーナスでお得に始めよう！",
    longDescription:
      "ワンダーカジノは、その名の通り「驚き」と「楽しさ」を提供するオンラインカジノです。2018年に設立され、迅速な入出金処理と充実したボーナスプロモーションで人気を集めています。特に初めてオンラインカジノをプレイする方でも安心して利用できるよう、24時間体制の日本語サポートが提供されています。\n\nゲームは3,000種類以上を取り揃えており、最新のスロットから、臨場感あふれるライブカジノ、様々なテーブルゲームまで、あらゆるニーズに応えます。特にEvolution GamingやPragmatic Playといった人気プロバイダーのゲームが豊富です。\n\nプロモーションも魅力的で、新規登録者向けの入金不要ボーナスや初回入金ボーナスはもちろん、リベートボーナスやキャッシュバックなど、既存プレイヤー向けの特典も充実しています。VIPプログラムでは、プレイすればするほどランクが上がり、特別なサービスや限定ボーナスが受けられます。\n\nモバイルにも完全対応しており、スマートフォンやタブレットからいつでもどこでもお気に入りのゲームを楽しめます。安全なキュラソーライセンスを取得しており、セキュリティ面も万全です。",
    features: [
      "登録するだけで$30ボーナス",
      "3,000種類以上のゲーム",
      "24時間日本語サポート",
      "豊富なボーナスとプロモーション",
      "モバイル完全対応",
      "安全なキュラソーライセンス取得済み",
      "迅速な入出金対応",
    ],
    paymentMethods: [
      { name: "クレジットカード", processing: "即時", withdrawal: "非対応" },
      { name: "エコペイズ", processing: "即時", withdrawal: "1時間以内" },
      { name: "Vega Wallet", processing: "即時", withdrawal: "1時間以内" },
      { name: "銀行振込", processing: "即時-1時間", withdrawal: "1-3営業日" },
      { name: "仮想通貨", processing: "即時", withdrawal: "1時間以内" },
    ],
    games: [
      { name: "スロット", count: "2,500+" },
      { name: "テーブルゲーム", count: "150+" },
      { name: "ライブカジノ", count: "200+" },
      { name: "ジャックポット", count: "80+" },
    ],
    pros: [
      "豊富なゲームラインナップ",
      "登録ボーナスと充実のプロモーション",
      "24時間日本語サポート",
      "迅速な入出金処理",
      "VIPプログラムの特典",
    ],
    cons: ["一部ボーナスに高めの賭け条件がある場合", "人気が高くサポートが混み合う時間帯がある"],
    officialLink: "https://tracker-pm2.casino-wonder.com/link?btag=96420424_437635" // 実際の公式サイトURLに置き換える
  },
  {
    id: "duelbits",
    name: "デュエルビッツ",
    logo: "/duelbits_logo.png?height=200&width=400", // 実際のロゴパスに
    banner: "/duelbits_logo.png?height=600&width=1200", // 実際のバナーパスに
    bonus: "最大$1000のウェルカムパッケージ",
    rating: 4.7,
    description: "仮想通貨に特化した次世代カジノ。独自のオリジナルゲームと充実したVIP特典が魅力！",
    longDescription:
      "デュエルビッツは、仮想通貨をメインに扱う革新的なオンラインカジノです。特にビットコインやイーサリアムなどの仮想通貨ユーザーにとっては、高速で安全な入出金が可能である点が大きな魅力です。\n\n独自の「オリジナルゲーム」が充実しており、他では味わえないユニークなゲーム体験ができます。シンプルながらも戦略性の高いダイスや、マインスイーパーのようなゲームなど、中毒性のあるゲームが多数あります。\n\nボーナス面では、新規プレイヤー向けのウェルカムパッケージだけでなく、日替わり、週替わりのプロモーションが豊富に用意されています。特に、VIPプログラムが充実しており、高額ベットを行うプレイヤーには、専用のサポートや限定ボーナス、キャッシュバックなどが提供されます。\n\n日本語サポートも提供されており、仮想通貨に関する疑問やゲームに関する問題にも迅速に対応してくれます。透明性の高いRTP（還元率）表示も特徴で、公平なゲームプレイが保証されています。",
    features: [
      "仮想通貨に特化",
      "オリジナルゲームが豊富",
      "VIPプログラムが充実",
      "透明性の高い運営",
      "高速な入出金",
      "24時間サポート",
    ],
    paymentMethods: [
      { name: "ビットコイン", processing: "即時", withdrawal: "10分以内" },
      { name: "イーサリアム", processing: "即時", withdrawal: "10分以内" },
      { name: "ライトコイン", processing: "即時", withdrawal: "10分以内" },
      { name: "テザー", processing: "即時", withdrawal: "10分以内" },
      { name: "Visa/Mastercard", processing: "即時", withdrawal: "非対応 (仮想通貨へ変換)" },
    ],
    games: [
      { name: "オリジナルゲーム", count: "10+" },
      { name: "スロット", count: "2,000+" },
      { name: "ライブカジノ", count: "180+" },
    ],
    pros: [
      "仮想通貨ユーザーに最適",
      "独自の面白いオリジナルゲーム",
      "VIPプログラムが豪華",
      "出金速度が非常に速い",
      "公平性が高い",
    ],
    cons: ["仮想通貨に不慣れな人にはハードルが高い", "法定通貨での入出金オプションが少ない"],
    officialLink: "https://affiliates.duelbits.com/visit/?bta=35925&nci=5768" // 実際の公式サイトURLに置き換える
  },
  {
  "id": "k8",
  "name": "K8カジノ",
  "logo": "/k8_logo.png",
  "banner": "/k8_logo.png",
  "bonus": "初回入金100%ボーナス（最大$800）＋288回のフリースピン",
  "rating": 4.7,
  "description": "K8カジノは、豊富なゲームラインナップと高額ボーナスが魅力のオンラインカジノです。日本語サポートも充実しており、初心者から上級者まで安心してプレイできます。特にスロットゲームに力を入れており、旧式のパチスロ機種も楽しめます。",
  "longDescription": "K8カジノは、2013年に設立されたオンラインカジノで、3,000種類以上のゲームを提供しています。特にスロットゲームが充実しており、旧式のパチスロ機種も楽しめます。初回入金ボーナスとして、最大$800の100%ボーナスと288回のフリースピンが用意されており、賭け条件は入金額＋ボーナス額の25倍です。日本語サポートも24時間対応しており、安心してプレイできます。",
  "features": [
    "3,000種類以上のゲーム",
    "旧式のパチスロ機種が楽しめる",
    "初回入金100%ボーナス（最大$800）",
    "288回のフリースピン",
    "24時間日本語サポート",
    "モバイル対応",
    "安全なキュラソーライセンス取得済み"
  ],
  "paymentMethods": [
    { "name": "クレジットカード", "processing": "即時", "withdrawal": "非対応" },
    { "name": "エコペイズ", "processing": "即時", "withdrawal": "1時間以内" },
    { "name": "Vega Wallet", "processing": "即時", "withdrawal": "1時間以内" },
    { "name": "銀行振込", "processing": "即時-1時間", "withdrawal": "1-3営業日" },
    { "name": "仮想通貨", "processing": "即時", "withdrawal": "1時間以内" }
  ],
  "games": [
    { "name": "スロット", "count": "2,500+" },
    { "name": "テーブルゲーム", "count": "150+" },
    { "name": "ライブカジノ", "count": "200+" },
    { "name": "ジャックポット", "count": "80+" }
  ],
  "pros": [
    "豊富なゲームラインナップ",
    "高額な初回入金ボーナス",
    "旧式のパチスロ機種が楽しめる",
    "24時間日本語サポート",
    "迅速な入出金処理"
  ],
  "cons": [
    "一部ボーナスに高めの賭け条件がある場合",
    "人気が高くサポートが混み合う時間帯がある"
  ],
  "officialLink": "https://k8.io/?invite=calron"
},
{
  "id": "parimatch",
  "name": "パリマッチカジノ",
  "logo": "/parimatch_logo.png",
  "banner": "/parimatch_logo.png",
  "bonus": "初回入金150%ボーナス（最大$1,500）",
  "rating": 4.6,
  "description": "スポーツベットに強みを持つ世界的に有名なブックメーカー兼オンラインカジノ。多彩なスポーツイベントに賭けることができ、カジノゲームも充実。",
  "longDescription": "パリマッチカジノは、スポーツベットに特化したオンラインカジノで、初回入金150%ボーナス（最大$1,500）を提供しています。多彩なスポーツイベントへのベットオプションと、豊富なカジノゲームが魅力です。日本語サポートも完備されており、安心して利用できます。",
  "features": [
    "スポーツベット強化",
    "豊富なプロモーション",
    "日本語サポート",
    "多彩なカジノゲーム",
    "迅速な入出金処理"
  ],
  "paymentMethods": [
    { "name": "クレジットカード", "processing": "即時", "withdrawal": "1-3営業日" },
    { "name": "エコペイズ", "processing": "即時", "withdrawal": "1時間以内" },
    { "name": "仮想通貨", "processing": "即時", "withdrawal": "1時間以内" }
  ],
  "games": [
    { "name": "スロット", "count": "2,000+" },
    { "name": "テーブルゲーム", "count": "100+" },
    { "name": "ライブカジノ", "count": "150+" },
    { "name": "スポーツベット", "count": "多種多様" }
  ],
  "pros": [
    "スポーツベットとカジノの両方を楽しめる",
    "豊富なプロモーション",
    "日本語サポート完備",
    "迅速な入出金処理"
  ],
  "cons": [
    "一部のプロモーションに高めの賭け条件がある場合",
    "特定のゲームプロバイダーが未対応"
  ],
  "officialLink": "https://affcl.org/?serial=61314390&creative_id=4261"
},

{
  "id": "stake",
  "name": "Stakeカジノ",
  "logo": "/stake_logo.png",
  "banner": "/stake_logo.png",
  "bonus": "初回入金200%ボーナス（最大$2,000）＋入金不要ボーナス$14",
  "rating": 4.8,
  "description": "Stakeカジノは、仮想通貨専門のオンラインカジノで、独自のオリジナルゲームと高い還元率が特徴です。入金不要ボーナスや高額な初回入金ボーナスが用意されており、VIPプログラムも充実しています。",
  "longDescription": "Stakeカジノは、仮想通貨に特化したオンラインカジノで、ビットコイン、イーサリアム、ライトコインなど多様な仮想通貨に対応しています。初回入金ボーナスとして、最大$2,000の200%ボーナスが提供されており、さらに入金不要ボーナスとして$14が進呈されます。独自のオリジナルゲームや高い還元率、充実したVIPプログラムが魅力です。日本語サポートも提供されており、安心してプレイできます。",
  "features": [
    "仮想通貨に特化",
    "独自のオリジナルゲームが豊富",
    "初回入金200%ボーナス（最大$2,000）",
    "入金不要ボーナス$14",
    "高い還元率",
    "充実したVIPプログラム",
    "日本語サポート対応"
  ],
  "paymentMethods": [
    { "name": "ビットコイン", "processing": "即時", "withdrawal": "10分以内" },
    { "name": "イーサリアム", "processing": "即時", "withdrawal": "10分以内" },
    { "name": "ライトコイン", "processing": "即時", "withdrawal": "10分以内" },
    { "name": "テザー", "processing": "即時", "withdrawal": "10分以内" },
    { "name": "Visa/Mastercard", "processing": "即時", "withdrawal": "非対応 (仮想通貨へ変換)" }
  ],
  "games": [
    { "name": "オリジナルゲーム", "count": "10+" },
    { "name": "スロット", "count": "2,000+" },
    { "name": "ライブカジノ", "count": "180+" }
  ],
  "pros": [
    "仮想通貨ユーザーに最適",
    "独自の面白いオリジナルゲーム",
    "VIPプログラムが豪華",
    "出金速度が非常に速い",
    "公平性が高い"
  ],
  "cons": [
    "仮想通貨に不慣れな人にはハードルが高い",
    "法定通貨での入出金オプションが少ない"
  ],
  "officialLink": "https://stake.com/?c=aLjELsQU&offer=calro200"
},

  {
    id: "kachiwin",
    name: "勝win",
    logo: "/katsu.jpg?height=200&width=400", // 実際のロゴパスに
    banner: "/katsu.jpg?height=600&width=1200", // 実際のバナーパスに
    bonus: "最大$1000のウェルカムボーナス",
    rating: 4.5,
    description: "スポーツベットもカジノも楽しめる！日本市場に特化したサービスで、安心してプレイできる。",
    longDescription:
      "勝winは、カジノゲームとスポーツベットの両方を一つのプラットフォームで楽しめる総合型オンラインゲーミングサイトです。特に日本市場に力を入れており、日本人プレイヤーにとって使いやすいインターフェースと、親切な日本語サポートが特徴です。\n\nカジノゲームでは、人気プロバイダーのスロット、ライブカジノ、テーブルゲームが幅広く提供されており、定期的に新しいゲームが追加されます。また、スポーツベットでは、Jリーグやプロ野球を含む国内外の様々なスポーツイベントにベットすることができ、多様なベットオプションが用意されています。\n\nボーナスも充実しており、新規登録者向けのウェルカムボーナスはもちろん、フリースピンやキャッシュバック、リロードボーナスなど、プレイヤーが長く楽しめるようなプロモーションが豊富です。入出金方法も日本のユーザーに馴染み深いものが多く、スムーズな取引が可能です。\n\n安全性と信頼性も高く、正規のライセンスを取得して運営されています。何か問題があった場合でも、迅速に対応してくれる日本語サポートがあるため、初心者から経験者まで安心して利用できます。",
    features: [
      "カジノとスポーツベットの両方",
      "日本市場向けサービス",
      "幅広い入出金方法",
      "豊富なボーナスプロモーション",
      "日本語サポート充実",
      "モバイル対応",
      "高い安全性と信頼性",
    ],
    paymentMethods: [
      { name: "クレジットカード", processing: "即時", withdrawal: "非対応" },
      { name: "銀行振込", processing: "即時-1時間", withdrawal: "1-3営業日" },
      { name: "エコペイズ", processing: "即時", withdrawal: "数時間-1日" },
      { name: "スティックペイ", processing: "即時", withdrawal: "数時間-1日" },
      { name: "仮想通貨", processing: "即時", withdrawal: "1時間以内" },
    ],
    games: [
      { name: "スロット", count: "1,800+" },
      { name: "テーブルゲーム", count: "80+" },
      { name: "ライブカジノ", count: "120+" },
      { name: "スポーツベット", count: "多種多様" },
    ],
    pros: [
      "カジノとスポーツベットを両方楽しめる",
      "日本人向けに最適化されたサービス",
      "入出金方法が豊富で便利",
      "質の高い日本語サポート",
      "ウェルカムボーナスが魅力的",
    ],
    cons: ["一部の人気ゲームがない場合がある", "プロモーションの更新頻度がやや低い時がある"],
    officialLink: "https://tracker.katsuwinaffiliates.ai/link?btag=90306436_414265" // 実際の公式サイトURLに置き換える
  }
];

// このページは動的に生成されます
export default function CasinoDetail({ params }: { params: { id: string } }) {
  // URLのID (例: 'wonder', 'duelbits') に基づいて、上記のデータから該当するカジノを見つけます
  const casino = casinoData.find((c) => c.id === params.id);

  // もし該当するカジノが見つからなかった場合（例：存在しないIDがURLに来た場合）
  if (!casino) {
    // 実際には404ページにリダイレクトするか、エラーメッセージを表示します。
    // 今回は単純にメッセージを表示します。
    return (
      <main className="pt-20 pb-20 bg-black min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">カジノが見つかりません</h1>
          <p className="text-xl">指定されたカジノIDには情報がありません。</p>
          <Link href="/casino-ranking" className="text-amber-400 mt-6 block hover:underline">
            <ArrowLeft size={16} className="inline-block mr-1" />
            カジノランキングに戻る
          </Link>
        </div>
      </main>
    );
  }

  // カジノが見つかった場合は、そのカジノの詳細を表示します
  return (
    <main className="pt-20 pb-20 bg-black">
      <div className="relative overflow-hidden">
        {/* ヒーローセクション */}
        <div className="relative h-[300px] md:h-[400px]">
          <Image
            src={casino.banner || "/placeholder.svg"}
            alt={`${casino.name}のバナー`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black"></div>
          <Particles className="absolute inset-0" count={50} color="rgba(255, 215, 0, 0.3)" />

          <div className="container mx-auto px-4 relative h-full flex flex-col justify-center">
            <Link href="/casino-ranking" className="flex items-center text-amber-400 mb-4 hover:underline">
              <ArrowLeft size={16} className="mr-1" />
              カジノランキングに戻る
            </Link>

            <div className="flex items-center mb-4">
              <div className="relative w-24 h-24 mr-6 bg-white rounded-lg p-2">
                <Image src={casino.logo || "/placeholder.svg"} alt={casino.name} fill className="object-contain" />
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <Shimmer>
                    <span>{casino.name}</span>
                  </Shimmer>
                </h1>

                <div className="flex items-center">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`${
                          i < Math.floor(casino.rating)
                            ? "text-amber-400 fill-amber-400"
                            : i < casino.rating
                              ? "text-amber-400 fill-amber-400 opacity-50"
                              : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-bold">{casino.rating}/5.0</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 max-w-3xl">{casino.description}</p>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* メイン情報 */}
            <div className="lg:col-span-2">
              <ScrollAnimation variant="fadeInUp">
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">カジノ情報</h2>
                  <div className="prose prose-invert max-w-none">
                    {/* longDescriptionを改行で分割して表示 */}
                    {casino.longDescription.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-300 mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation variant="fadeInUp" delay={0.1}>
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">特徴</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {casino.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <Check size={18} className="text-amber-400 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollAnimation>

              <ScrollAnimation variant="fadeInUp" delay={0.2}>
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">入出金方法</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="py-3 px-4 text-amber-400">決済方法</th>
                          <th className="py-3 px-4 text-amber-400">入金処理時間</th>
                          <th className="py-3 px-4 text-amber-400">出金処理時間</th>
                        </tr>
                      </thead>
                      <tbody>
                        {casino.paymentMethods.map((method, index) => (
                          <tr key={index} className="border-b border-gray-700 last:border-0">
                            <td className="py-3 px-4 text-white">{method.name}</td>
                            <td className="py-3 px-4 text-gray-300">{method.processing}</td>
                            <td className="py-3 px-4 text-gray-300">{method.withdrawal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation variant="fadeInUp" delay={0.3}>
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-white mb-4">メリット・デメリット</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-green-500 mb-3">メリット</h3>
                      <ul className="space-y-2">
                        {casino.pros.map((pro, index) => (
                          <li key={index} className="flex items-start text-gray-300">
                            <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-500 mb-3">デメリット</h3>
                      <ul className="space-y-2">
                        {casino.cons.map((con, index) => (
                          <li key={index} className="flex items-start text-gray-300">
                            <span className="text-red-500 mr-2 mt-1 flex-shrink-0">✕</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* サイドバー */}
            <div className="lg:col-span-1">
              <ScrollAnimation variant="fadeInRight">
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl p-6 mb-8 sticky top-24">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">ボーナス情報</h3>
                    <div className="bg-amber-500/20 text-amber-400 font-bold py-3 px-4 rounded-lg mb-4">
                      {casino.bonus}
                    </div>
                    <Link
                      href={casino.officialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-bold px-6 py-3 rounded-md transition-all transform hover:scale-105 w-full"
                    >
                      公式サイトへ
                      <ExternalLink size={16} className="inline-block ml-2" />
                    </Link>
                    <p className="text-gray-400 text-sm mt-2">
                      *利用規約が適用されます。責任あるギャンブルを心がけましょう。
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-3">ゲーム数</h3>
                    <ul className="space-y-2">
                      {casino.games.map((game, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center text-gray-300 py-2 border-b border-gray-700 last:border-0"
                        >
                          <span>{game.name}</span>
                          <span className="font-bold text-amber-400">{game.count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">関連記事</h3>
                    <ul className="space-y-3">
                      {/* ここは、各カジノに関連する記事のリンクを動的に生成するように変更することもできます */}
                      {[
                        `${casino.name}の登録方法`,
                        `${casino.name}の出金方法と注意点`,
                        `${casino.name}のボーナス攻略法`,
                        `${casino.name}のおすすめスロット5選`,
                      ].map((article, index) => (
                        <li key={index}>
                          <Link href="#" className="text-amber-400 hover:underline flex items-center">
                            <span className="mr-2">→</span>
                            <span>{article}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}