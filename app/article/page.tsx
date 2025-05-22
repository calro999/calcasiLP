import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // next/link から Link をインポート
import ArticleLayout from '@/components/layouts/ArticleLayout'; // ArticleLayout をインポート

// このページが受け取るパラメータの型定義
interface ArticlePageProps {
  params: {
    id: string; // URLの [id] の部分がここに入る
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const articleId = params.id; // URLから記事IDを取得

  // 実際のアプリケーションでは、ここで記事IDに基づいて記事データをAPIなどからフェッチします。
  // 例: const article = await fetchArticleData(articleId);
  // 今回は、簡易的にIDごとにコンテンツを出し分けます。

  let content;
  let title = "";

  if (articleId === "1") { // IDが1の場合のコンテンツ
    title = "2025年最新！おすすめオンラインカジノランキングTOP10";
    content = (
      <>
        {/* 画像パスは、publicフォルダからの相対パスで指定してください */}
        <Image
          src="/images/articles/ranking_2025.jpg" // 適切な画像パスに置き換えてください（例: public/images/articles/ranking_2025.jpg に画像を置く場合）
          alt="2025年最新オンラインカジノランキング"
          width={1200} // 画像のオリジナルのアスペクト比に合わせて調整してください
          height={675} // 画像のオリジナルのアスペクト比に合わせて調整してください
          className="rounded-lg mb-8 w-full h-auto" // w-full と h-auto を追加してレスポンシブに
        />
        <p className="lead text-lg mb-6">
          オンラインカジノ業界は常に進化しており、新しいカジノの登場や既存サイトのサービス改善が日々行われています。
          この記事では、2025年版の最新情報を基に、当サイトが厳選したおすすめオンラインカジノTOP10を徹底解説します。
          安全性、ボーナス、ゲームの種類、日本語サポート、入出金の利便性など、あらゆる視点から評価しました。
        </p>

        <h2 id="top10-criteria" className="text-3xl font-semibold mb-4 text-amber-300 mt-8">オンラインカジノ選びの重要ポイント</h2>
        <p className="mb-4">
          ランキングを見る前に、まずはオンラインカジノを選ぶ上で**最も重要となるポイント**を確認しましょう。
          これらの基準を満たしているかどうかが、安全で快適なプレイに直結します。
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>**信頼性の高いライセンス:** マルタ（MGA）、キュラソー、英国（UKGC）など、政府発行の公式ライセンスを保有しているか。</li>
          <li>**豊富なゲームの種類:** スロット、ライブカジノ、テーブルゲームなど、多様なゲームが提供されているか。</li>
          <li>**魅力的なボーナスとプロモーション:** 初回入金ボーナスやフリースピン、キャッシュバックなどのお得な情報。</li>
          <li>**迅速かつ多様な入出金方法:** クレジットカード、電子決済、仮想通貨など、自分に合った方法でスムーズに取引できるか。</li>
          <li>**充実した日本語サポート:** 日本語での問い合わせに対応しているか、対応時間や手段は適切か。</li>
          <li>**モバイル対応:** スマートフォンやタブレットからでも快適にプレイできるか。</li>
          <li>**公平性とセキュリティ:** 第三者機関によるゲームの監査や、SSL暗号化などのセキュリティ対策。</li>
        </ul>

        <h2 id="ranking-detail" className="text-3xl font-semibold mb-4 text-amber-300 mt-8">2025年オンラインカジノランキングTOP10</h2>
        <p className="mb-6">
          それでは、上記の基準に基づいた最新のランキングをご紹介します。各カジノの詳細は個別のレビューページでさらに詳しく解説しています。
        </p>

        <h3 id="rank1" className="text-2xl font-semibold mb-3 text-amber-300">第1位：ワンダーカジノ</h3>
        <p className="mb-2">
          **圧倒的な出金スピードと仮想通貨対応が魅力。** ハイローラー向けのVIPプログラムも充実しており、
          快適にゲームを楽しみたい方におすすめです。日本語サポートも手厚く、初心者でも安心して利用できます。
        </p>
        <p className="mb-6">
          <strong>主要ボーナス:</strong> 入金不要ボーナス$30<br/>
          <strong>特徴:</strong> 高速出金、VIPプログラム、仮想通貨対応、豊富なゲーム数
        </p>

        <h3 id="rank2" className="text-2xl font-semibold mb-3 text-amber-300">第2位：デュエルビッツ</h3>
        <p className="mb-2">
          **ゲーミフィケーション要素が満載の仮想通貨特化カジノ。** レーキバックシステムやオリジナルゲームが人気で、
          他のカジノにはないユニークな体験ができます。スポーツベットも充実しています。
        </p>
        <p className="mb-6">
          <strong>主要ボーナス:</strong> 初回入金最大50%レーキバック<br/>
          <strong>特徴:</strong> 仮想通貨特化、レーキバック、オリジナルゲーム、スポーツベット
        </p>

        <h3 id="rank3" className="text-2xl font-semibold mb-3 text-amber-300">第3位：K8</h3>
        <p className="mb-2">
          **高額ボーナスと多彩なプロモーションが魅力の仮想通貨カジノ。** スロット、ライブカジノ、スポーツベットまで幅広いゲームを提供しており、手厚いVIPプログラムも用意されています。
        </p>
        <p className="mb-6">
          <strong>主要ボーナス:</strong> 初回入金100%ボーナス（最大$2,000）<br/>
          <strong>特徴:</strong> 仮想通貨対応、高額ボーナス、VIP制度
        </p>
        
        <h3 id="rank4" className="text-2xl font-semibold mb-3 text-amber-300">第4位：パリマッチ</h3>
        <p className="mb-2">
          **スポーツベットに強みを持つ世界的な大手。** 多彩なスポーツイベントに賭けることができ、カジノゲームも充実。信頼性と実績を重視する方におすすめです。
        </p>
        <p className="mb-6">
          <strong>主要ボーナス:</strong> 初回入金150%ボーナス（最大$1,500）<br/>
          <strong>特徴:</strong> スポーツベット強化、豊富なプロモーション、日本語サポート
        </p>

        <h3 id="rank5" className="text-2xl font-semibold mb-3 text-amber-300">第5位：Stake</h3>
        <p className="mb-2">
          **世界中で絶大な人気を誇る仮想通貨専門カジノ。** 独自のオリジナルゲームと、ベット額に応じたレーキバックシステムが特徴です。ライブカジノやスポーツベットも充実しています。
        </p>
        <p className="mb-6">
          <strong>主要ボーナス:</strong> 初回入金200%ボーナス（最大$2,000）<br/>
          <strong>特徴:</strong> 仮想通貨専門、オリジナルゲーム、レーキバック、グローバル人気
        </p>

        <h3 id="rank6" className="text-2xl font-semibold mb-3 text-amber-300">第6位：カジ旅</h3>
        <p className="mb-2">
          **RPG要素を取り入れたユニークなカジノ。** ゲームをクリアしながらボーナスを獲得できるなど、遊び心が満載。初心者でも楽しく始められます。
        </p>
        <p className="mb-6">
          <strong>主要ボーナス:</strong> 初回入金最大$500 + 250フリースピン<br/>
          <strong>特徴:</strong> RPG要素、豊富なスロット、日本語サポート
        </p>

        <h3 id="rank7" className="text-2xl font-semibold mb-3 text-amber-300">第7位：ミスティーノ</h3>
        <p className="mb-2">
          **サプライズキャッシュバックが魅力のオンラインカジノ。** 日替わりで楽しめるフリースピンや入金ボーナスも提供されており、気軽にプレイしたい方におすすめです。
        </p>
        <p className="mb-6">
          <strong>主要ボーナス:</strong> サプライズキャッシュバック、日替わりフリースピン<br/>
          <strong>特徴:</strong> 出金条件が緩い、キャッシュバック、シンプルなサイト設計
        </p>

        <h3 id="rank8" className="text-2xl font-semibold mb-3 text-amber-300">第8位：ボンズカジノ</h3>
        <p className="mb-2">
          **豪華なボーナスと幅広いゲームセレクション。** スポーツベットも楽しめるオールインワン型のカジノです。キャッシュバックやVIPプログラムも充実しています。
        </p>
        <p className="mb-6">
          <strong>主要ボーナス:</strong> 初回入金最大$2,000 + 200フリースピン<br/>
          <strong>特徴:</strong> 高額ボーナス、スポーツベット、多様なゲームプロバイダ
        </p>

        <h3 id="rank9" className="text-2xl font-semibold mb-3 text-amber-300">第9位：カジノミー</h3>
        <p className="mb-2">
          **攻略型カジノとして人気の「Blitzモード」を搭載。** 通常のスロットを6倍速で楽しめるなど、ユニークな機能が魅力です。初心者にも分かりやすい解説記事も豊富。
        </p>
        <p className="mb-6">
          <strong>主要ボーナス:</strong> 初回入金最大$777 + フリースピン<br/>
          <strong>特徴:</strong> Blitzモード、攻略情報、キャッシュバック
        </p>

        <h3 id="rank10" className="text-2xl font-semibold mb-3 text-amber-300">第10位：遊雅堂</h3>
        <p className="mb-2">
          **ベラジョンカジノの姉妹サイトで、日本人プレイヤー向けに特化。** 日本円で直接入出金できるのが大きな特徴です。和風デザインで親しみやすく、初めての方にもおすすめです。
        </p>
        <p className="mb-6">
          <strong>主要ボーナス:</strong> 初回入金最大5万円 + フリースピン<br/>
          <strong>特徴:</strong> 日本円対応、和風デザイン、日本人向けプロモーション
        </p>

        <h2 id="conclusion" className="text-3xl font-semibold mb-4 text-amber-300 mt-8">まとめ</h2>
        <p className="text-lg">
          2025年版のオンラインカジノランキングはいかがでしたでしょうか？
          各カジノにはそれぞれ異なる強みと特徴があります。
          ご自身のプレイスタイルや重視するポイントに合わせて、最適なカジノを見つけてください。
          より安全で楽しいオンラインカジノライフを送るために、この記事が役立てば幸いです。
        </p>
      </>
    );
  } else if (articleId === "2") { // 例: IDが2の場合のコンテンツ（「初心者必見！オンラインカジノの始め方完全ガイド」）
    title = "初心者必見！オンラインカジノの始め方完全ガイド";
    content = (
      <>
        <Image
          src="/images/articles/beginners_guide.jpg" // 適切な画像パスに置き換えてください
          alt="オンラインカジノの始め方"
          width={1200}
          height={675}
          className="rounded-lg mb-8 w-full h-auto"
        />
        <p className="lead text-lg mb-6">
          オンラインカジノに興味はあるけれど、どうやって始めたらいいかわからない…という方も多いのではないでしょうか。
          この記事では、オンラインカジノを始めるためのステップを、初心者の方にも分かりやすく解説します。
          安全に楽しくプレイするためのポイントも紹介しますので、ぜひ参考にしてください。
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-amber-300 mt-8">ステップ1: 信頼できるオンラインカジノを選ぶ</h2>
        <p className="mb-4">
          まず最も重要なのは、**信頼性と安全性の高いオンラインカジノを選ぶ**ことです。
          以下の点を確認しましょう。
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>**公式ライセンスの有無:** マルタ共和国（MGA）やキュラソー政府などが発行する、信頼性の高いライセンスを持っているか確認します。</li>
          <li>**第三者機関の監査:** ゲームの公平性が、eCOGRAなどの第三者機関によって定期的に監査されているか。</li>
          <li>**日本語サポート:** 困った時に日本語で問い合わせができるサポート体制が整っているか。</li>
        </ul>
        <p className="mb-6">
          当サイトの<Link href="/casino-ranking" className="text-amber-400 hover:underline">カジノランキング</Link>も参考に、ご自身に合ったカジノを選びましょう。
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-amber-300 mt-8">ステップ2: アカウント登録</h2>
        <p className="mb-4">
          選んだカジノの公式サイトにアクセスし、「登録」や「今すぐプレイ」などのボタンをクリックして、アカウント登録を開始します。
        </p>
        <p className="mb-6">
          入力する情報は主に以下の通りです。
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>メールアドレス</li>
            <li>パスワード</li>
            <li>氏名（ローマ字）</li>
            <li>生年月日</li>
            <li>住所</li>
            <li>電話番号</li>
          </ul>
          入力後、メール認証などを行い、登録を完了させます。
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-amber-300 mt-8">ステップ3: 入金方法を選ぶ</h2>
        <p className="mb-4">
          アカウント登録が完了したら、実際にお金をカジノに入金します。
          主な入金方法は以下の通りです。
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>**クレジットカード:** Visa, Mastercard, JCBなど（手数料がかかる場合あり）</li>
          <li>**電子決済サービス:** ecoPayz, MuchBetter, VegaWalletなど</li>
          <li>**仮想通貨:** ビットコイン（BTC）, イーサリアム（ETH）など</li>
          <li>**銀行振込:** 最近では日本円の銀行振込に対応しているカジノも増えています</li>
        </ul>
        <p className="mb-6">
          ご自身が使いやすい方法を選び、指示に従って入金を完了させましょう。
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-amber-300 mt-8">ステップ4: ボーナスを受け取る</h2>
        <p className="mb-4">
          多くのオンラインカジノでは、新規登録時や初回入金時に様々なボーナスを提供しています。
          入金不要ボーナスや初回入金ボーナスなど、お得なボーナスを上手に活用しましょう。
        </p>
        <p className="mb-6">
          **注意点:** ボーナスには「賭け条件（出金条件）」が設定されていることがほとんどです。
          ボーナス利用規約をよく読み、条件を理解してから利用するようにしてください。
          詳細は<Link href="/beginners-guide/bonuses" className="text-amber-400 hover:underline">ボーナスの活用方法と注意点</Link>をご確認ください。
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-amber-300 mt-8">ステップ5: ゲームをプレイする</h2>
        <p className="mb-4">
          入金とボーナス受け取りが完了したら、いよいよゲームをプレイできます！
          スロット、ライブカジノ、ルーレット、ブラックジャックなど、様々なゲームが楽しめます。
        </p>
        <p className="mb-6">
          最初は少額から始め、ゲームのルールや流れを掴むようにしましょう。
          無料プレイモードが用意されているゲームもあるので、それらを活用して練習するのもおすすめです。
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-amber-300 mt-8">まとめ</h2>
        <p className="text-lg">
          オンラインカジノの始め方は、思っているよりも簡単です。
          しかし、安全に楽しくプレイするためには、信頼できるカジノ選びとボーナス条件の理解が不可欠です。
          この記事を参考に、ぜひあなたもオンラインカジノの世界を楽しんでみてください。
        </p>
      </>
    );
  } else if (articleId === "3") { // 例: IDが3の場合のコンテンツ（「勝率アップ！バカラの必勝法と攻略テクニック」）
    title = "勝率アップ！バカラの必勝法と攻略テクニック";
    content = (
      <>
        <Image
          src="/images/articles/baccarat_strategy.jpg" // 適切な画像パスに置き換えてください
          alt="バカラ必勝法"
          width={1200}
          height={675}
          className="rounded-lg mb-8 w-full h-auto"
        />
        <p className="lead text-lg mb-6">
          カジノの王様とも呼ばれるバカラは、シンプルながら奥深いゲームで、世界中のプレイヤーを魅了しています。
          この記事では、バカラで勝率を上げるための基本的な知識から、実践的な必勝法や攻略テクニックまでを詳しく解説します。
          初心者から上級者まで、バカラで勝ちたい方は必見です。
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-amber-300 mt-8">バカラの基本ルール</h2>
        <p className="mb-4">
          バカラは、「プレイヤー」と「バンカー」のどちらが「9」に近い数字になるかを予測するゲームです。
          配られたカードの合計点数の下一桁が勝負となり、絵札（J, Q, K）と10は0点、Aは1点と数えます。
          勝敗はシンプルですが、ベットの種類やコミッション（バンカー勝利時の手数料）など、いくつかのルールがあります。
        </p>
        <ul className="list-disc list-inside mb-6 space-y-2">
          <li>**プレイヤー (Player):** プレイヤーが勝利すると予測。配当は2倍（手数料なし）。</li>
          <li>**バンカー (Banker):** バンカーが勝利すると予測。配当は1.95倍（勝利金の5%が手数料）。</li>
          <li>**タイ (Tie):** プレイヤーとバンカーが引き分けと予測。配当は9倍（カジノによる）。</li>
        </ul>

        <h2 className="text-3xl font-semibold mb-4 text-amber-300 mt-8">バカラの必勝法（マネーマネジメント戦略）</h2>
        <p className="mb-4">
          バカラは運の要素が強いゲームですが、適切なマネーマネジメント戦略を用いることで、資金を管理し、勝率を向上させることができます。
        </p>
        <h3 className="text-2xl font-semibold mb-3 text-amber-300">1. マーチンゲール法</h3>
        <p className="mb-6">
          負けたら次ゲームのベット額を2倍にする戦略です。一度勝てば損失を取り戻し利益を出せるシンプルさが魅力ですが、連敗が続くとベット額が急増するリスクがあります。
        </p>
        <h3 className="text-2xl font-semibold mb-3 text-amber-300">2. パーレー法（逆マーチンゲール法）</h3>
        <p className="mb-6">
          勝ったら次ゲームのベット額を2倍にする戦略です。短期間で大きな利益を狙える反面、一度負けると利益を全て失う可能性があります。
        </p>
        <h3 className="text-2xl font-semibold mb-3 text-amber-300">3. ココモ法</h3>
        <p className="mb-6">
          負けたら前々回と前回のベット額を合計した金額を次ゲームでベットする戦略です。マーチンゲール法よりもベット額の増加が緩やかで、コツコツと利益を積み上げたい方におすすめです。
        </p>
        <p className="mb-6">
          **重要:** これらの必勝法は、あくまで資金管理の戦略であり、ゲームの勝率を保証するものではありません。
          資金に余裕を持たせ、損切りラインを設定することが非常に重要です。
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-amber-300 mt-8">バカラの攻略テクニック</h2>
        <h3 className="text-2xl font-semibold mb-3 text-amber-300">1. 罫線分析</h3>
        <p className="mb-6">
          バカラのテーブルには、過去の勝敗履歴を示す「罫線」と呼ばれるものが表示されます。
          これを分析し、次の出目を予測するテクニックです。流れを読み解くことができれば、ベットの判断材料になります。
          ただし、罫線はあくまで結果の記録であり、未来を保証するものではありません。
        </p>
        <h3 className="text-2xl font-semibold mb-3 text-amber-300">2. バンカーベットを基本とする</h3>
        <p className="mb-6">
          バカラでは、バンカーが勝利する確率がプレイヤーよりもわずかに高い（統計的に有利）とされています。
          これはバンカー勝利時に5%のコミッションが徴収されることにも表れています。
          長期的に見て勝率を安定させたいのであれば、バンカーへのベットを基本にするのがおすすめです。
        </p>

        <h2 className="text-3xl font-semibold mb-4 text-amber-300 mt-8">まとめ</h2>
        <p className="text-lg">
          バカラは運の要素が強いですが、適切な戦略と資金管理を組み合わせることで、より有利にゲームを進めることができます。
          まずは基本ルールをしっかり理解し、少額から実践して経験を積んでみましょう。
          必勝法や攻略テクニックを試しながら、あなたなりの勝ち方を見つけてください。
        </p>
      </>
    );
  }
  // 他の記事ID (例: "4", "5", "6", ...) に対応するコンテンツをここに追加していくことができます。
  // 必要に応じて、記事データを外部ファイルやAPIから取得する仕組みを構築することを検討してください。
  else {
    // 記事IDが存在しない場合（例: 404ページとして表示）
    title = "記事が見つかりません";
    content = (
      <p className="text-lg text-gray-400">
        お探しの記事は存在しないか、削除された可能性があります。
        <br />
        <Link href="/latest-news" className="text-amber-400 hover:underline mt-4 inline-block">
          最新情報一覧へ戻る
        </Link>
      </p>
    );
  }

  return (
    <ArticleLayout title={title}>
      {content}
    </ArticleLayout>
  );
}