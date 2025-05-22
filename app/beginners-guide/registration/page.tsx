// app/beginners-guide/registration/page.tsx

import React from 'react';
import Link from 'next/link';

export default function RegistrationAndDepositGuidePage() {
  return (
    <div className="container mx-auto p-8 pt-20 pb-20 bg-black text-white min-h-screen">
      <Link href="/beginners-guide" className="text-amber-400 hover:underline mb-8 block text-lg">
        &larr; 初心者ガイド一覧へ戻る
      </Link>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-amber-300">アカウント登録から入金までの流れ</h1>
      <p className="text-lg mb-4 text-gray-300">
        オンラインカジノで実際にゲームをプレイするためには、まずアカウントの登録と資金の入金が必要です。
        基本的な流れはどのカジノでも共通しているため、一度覚えてしまえばスムーズに始められます。
      </p>

      <h2 className="text-3xl font-semibold mb-4 text-amber-300">1. アカウント登録（新規登録）</h2>
      <p className="mb-4 text-gray-300">
        オンラインカジノのウェブサイトにアクセスしたら、通常、画面の右上や目立つ場所に「登録」「新規登録」「今すぐプレイ」といったボタンがありますので、そちらをクリックします。
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-300">
        <li>
          **個人情報の入力:** 氏名、生年月日、住所、電話番号、メールアドレスなどの基本情報を入力します。正確な情報を提供することが重要です。
        </li>
        <li>
          **ユーザー名とパスワードの設定:** ログイン時に使用するユーザー名（またはメールアドレス）と、安全なパスワードを設定します。
        </li>
        <li>
          **通貨の選択:** 日本円（JPY）や米ドル（USD）など、使用したい通貨を選択します。
        </li>
        <li>
          **利用規約への同意:** サイトの利用規約やプライバシーポリシーを読み、同意するチェックボックスにチェックを入れます。
        </li>
        <li>
          **メール認証:** 登録したメールアドレスに確認メールが届くので、メール内のリンクをクリックしてアカウントを有効化します。これで登録は完了です。
        </li>
      </ul>
      <p className="mb-6 text-gray-300">
        **ポイント:** 登録情報は出金時の本人確認で必要となるため、必ず正確な情報を入力しましょう。
      </p>

      <h2 className="text-3xl font-semibold mb-4 text-amber-300">2. 資金の入金</h2>
      <p className="mb-4 text-gray-300">
        アカウント登録が完了したら、いよいよカジノゲームをプレイするための資金を入金します。
        ログイン後、サイト内の「入金」「キャッシャー」「Deposit」などのセクションへ進みます。
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-300">
        <li>
          **入金方法の選択:** クレジットカード（Visa, Mastercardなど）、電子決済サービス（ecoPayz, MuchBetter, Vega Walletなど）、銀行送金、仮想通貨（Bitcoin, Ethereumなど）など、カジノが対応している中から好きな方法を選びます。
        </li>
        <li>
          **入金額の入力:** 入金したい金額を入力します。各入金方法には最低・最高入金額が設定されている場合があるので確認しましょう。
        </li>
        <li>
          **ボーナスの選択（任意）:** 初回入金ボーナスなどのプロモーションがある場合、この段階で選択またはプロモーションコードを入力します。
        </li>
        <li>
          **情報の入力と確定:** 選択した入金方法に応じた情報（例: クレジットカード番号、電子決済サービスのIDとパスワードなど）を入力し、入金を確定します。
        </li>
        <li>
          **入金完了:** 通常、電子決済や仮想通貨、クレジットカードであれば即座にアカウントに反映されます。銀行送金の場合は時間がかかることがあります。
        </li>
      </ul>
      <p className="mb-6 text-gray-300">
        **ポイント:** 各カジノや入金方法によって手数料や処理時間が異なります。事前に確認しておくことをおすすめします。また、初回入金ボーナスは非常にお得ですが、出金条件（賭け条件）があることを理解しておくことが重要です。
      </p>

      <p className="text-lg text-gray-300">
        これらのステップを完了すれば、あなたもオンラインカジノでのプレイを開始できます。
        不明な点があれば、カジノのサポートセンターに問い合わせるのが一番確実です。
      </p>
    </div>
  );
}