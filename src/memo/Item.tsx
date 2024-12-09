import React, { Component } from 'react'; // ReactのComponentクラスをインポート
import { connect, ConnectedProps } from 'react-redux'; // Reduxの接続関連の関数をインポート
import { deleteMemo } from './Store.ts'; // Reduxアクションの`deleteMemo`をインポート

// Memo 型を定義
interface Memo {
  memo: string; // メモの内容
  createTime: string; // メモの作成時間
}

// Redux ストアの RootState 型を定義
interface RootState {
  mode: string; // 現在のモード（例えば削除モードなど）
  data: Memo[]; // 全てのメモデータ
  fdata: Memo[]; // フィルタリングされたメモデータ（検索結果など）
}

// コンポーネントの Props 型を定義
interface ItemProps extends ConnectedProps<typeof connector> {
  num: number;   // 行番号
  value: Memo;   // 各項目の memo データ
}

class Item extends Component<ItemProps> {

  constructor(props: ItemProps) {
    super(props);
    this.doDelete = this.doDelete.bind(this); // `doDelete` メソッドのバインド
  }

  // 削除操作を行うメソッド
  doDelete(num: number) {
    const action = deleteMemo(num); // `deleteMemo` アクションを作成
    this.props.dispatch(action); // `dispatch` を使って削除アクションをReduxストアに送信
  }

  render() {
    return (
      <tr> {/* 行を表す */}
        <th>{this.props.num}</th> {/* 行番号 */}
        <td>{this.props.value.memo}</td> {/* メモ内容 */}
        <td>{this.props.value.createTime}</td> {/* メモの作成時間 */}
        <td>
          <input
            type="button" // ボタン型のインプット
            value="Delete" // ボタンのラベル
            onClick={() => this.doDelete(this.props.num)}  // ボタンがクリックされたときに `doDelete` を呼び出す
          />
        </td>
      </tr>
    );
  }
}

// `mapStateToProps` の戻り値の型を `RootState` として明示的に定義
const mapStateToProps = (state: RootState) => state; // Reduxストアから状態を取得

// `connect` を使用して Redux ストアに接続
const connector = connect(mapStateToProps); // `connect` 関数でコンポーネントをストアに接続

// コンポーネントをエクスポート
export default connector(Item); // `Item` コンポーネントをエクスポート
