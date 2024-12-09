import React, { Component } from 'react'; // Reactのコンポーネントクラスをインポート
import { connect, ConnectedProps } from 'react-redux'; // Reduxの接続関連の関数をインポート
import Item from './Item.tsx'; // Memoのアイテム表示用コンポーネントをインポート

// Reduxストア内の状態の型を定義
interface Memo { // メモの型を定義
  memo: string; // メモの内容
  createTime: string; // 作成時間
}

interface RootState { // ストアの状態の型を定義
  mode: string; // 現在のモード（例えば検索モードや通常モード）
  data: Memo[]; // 全てのメモデータ
  fdata: Memo[]; // フィルタリングされたメモデータ（検索結果など）
}

// コンポーネントのProps型を定義
interface MemoListProps extends ConnectedProps<typeof connector> {}

class MemoList extends Component<MemoListProps> {

  render() {
    let data;

    // mode に基づいて表示するデータを選択
    if (this.props.mode === 'search') { // 検索モードの場合
      // fdata（検索結果）のメモを表示
      data = this.props.fdata.map((element, index) => (
        <Item key={index} num={index} value={element} /> // 各アイテムに対してItemコンポーネントを生成
      ));
    } else {
      // 通常モードの場合
      // data（全てのメモ）のメモを表示
      data = this.props.data.map((element, index) => (
        <Item key={index} num={index} value={element} /> // 各アイテムに対してItemコンポーネントを生成
      ));
    }

    return (
      <div id="memoListDIV">
        <hr /> {/* 区切り線 */}
        <table> {/* メモのリストを表示するテーブル */}
          <thead>
            <tr>
              <th>No</th> {/* 行番号のヘッダー */}
              <td>Memo</td> {/* メモ内容のヘッダー */}
              <td>Timestamp</td> {/* タイムスタンプのヘッダー */}
              <td>Operation</td> {/* 操作のヘッダー */}
            </tr>
          </thead>
          <tbody>{data}</tbody> {/* 表示するデータ（Itemコンポーネント）を挿入 */}
        </table>
      </div>
    );
  }
}

// `connect` を使用して Redux ストアに接続
const mapStateToProps = (state: RootState) => state; // Reduxストアから状態を取得
const connector = connect(mapStateToProps); // `connect` 関数を使ってコンポーネントをストアに接続

export default connector(MemoList); // MemoListコンポーネントをReduxに接続してエクスポート
