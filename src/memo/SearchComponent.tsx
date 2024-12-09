import React, { Component, ChangeEvent, FormEvent } from 'react'; // Reactのコンポーネントクラスやイベント型をインポート
import { connect, ConnectedProps } from 'react-redux'; // Reduxの接続関連の関数をインポート
import { searchMemo } from './Store.ts'; // store.tsからsearchMemoアクションをインポート

// ReduxストアのRootState型を定義
interface RootState { // ストアの状態の型
  fdata: Array<{ memo: string; createTime: string }>; // 検索結果のメモデータ
  mode: string; // 現在のモード（例：検索モード、削除モードなど）
  data: Array<{ memo: string; createTime: string }>; // すべてのメモデータ
}

// コンポーネントのProps型を定義、`connect` からの型を継承
interface SearchComponentProps extends ConnectedProps<typeof connector> {}

interface SearchComponentState { // コンポーネントのローカル状態の型
  stext: string; // 検索する文字列
}

class SearchComponent extends Component<SearchComponentProps, SearchComponentState> {

  constructor(props: SearchComponentProps) {
    super(props);
    this.state = { // 初期状態を設定
      stext: '' // 検索文字列を空に初期化
    };
    this.doChange = this.doChange.bind(this); // 入力内容が変化したときに呼ばれる関数をバインド
    this.doAction = this.doAction.bind(this); // フォーム送信時に呼ばれる関数をバインド
    this.doClear = this.doClear.bind(this); // クリアボタンを押したときに呼ばれる関数をバインド
  }

  // 入力内容が変更された時にstateを更新
  doChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      stext: e.target.value // 入力された値をstateに保存
    });
  }

  // フォームが送信された時にsearchMemoアクションをディスパッチ
  doAction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // デフォルトのフォーム送信をキャンセル
    const action = searchMemo(this.state.stext); // 検索文字列を基にsearchMemoアクションを作成
    this.props.dispatch(action); // Reduxのdispatchメソッドを使ってアクションをストアに送信
  }

  // 入力フィールドをクリアし、searchMemoアクションをディスパッチ
  doClear(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    this.setState({
      stext: '' // 入力フィールドをクリア
    });
    const action = searchMemo(''); // 空の文字列でsearchMemoアクションを作成
    this.props.dispatch(action); // Reduxのdispatchメソッドを使ってアクションをストアに送信
  }

  render() {
    return (
      <div id="SearchComponentDIV"> 
        <form onSubmit={this.doAction}> {/* フォーム送信時にdoAction関数を呼び出し */}
          <input 
            type="text" 
            onChange={this.doChange} // 入力内容が変更されたらdoChange関数を呼び出し
            value={this.state.stext} // 入力フィールドの値をstateに同期
            required 
          />
          <input type="submit" value="Search" /> {/* 検索ボタン */}
          <input type="button" value="Clear" onClick={this.doClear} /> {/* クリアボタン */}
        </form>
      </div>
    );
  }
}

// `mapStateToProps` の戻り値の型を `RootState` として明示的に定義
const mapStateToProps = (state: RootState) => state; // Reduxストアの状態を取得

// `connect` を使用してReduxストアに接続
const connector = connect(mapStateToProps);

export default connector(SearchComponent); // コンポーネントをReduxに接続してエクスポート
