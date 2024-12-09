import React, { Component, FormEvent, ChangeEvent } from 'react'; // ReactのComponentクラスと、イベント関連の型をインポート
import { connect, ConnectedProps } from 'react-redux'; // Reduxの接続関連の関数をインポート
import { addMemo } from './Store.ts'; // `addMemo` アクションをインポート

// Redux ストアの RootState 型を定義
interface RootState {
  information: string; // Reduxストアの`information`プロパティの型を定義
}

// コンポーネントの Props 型を定義
interface AddComponentProps extends ConnectedProps<typeof connector> {} // `connect` から受け取るProps型を定義

interface AddComponentState {
  stext: string; // 入力フィールドの状態を保持するためのstateを定義
}

class AddComponent extends Component<AddComponentProps, AddComponentState> {

  constructor(props: AddComponentProps) {
    super(props);
    this.state = {
      stext: '' // 入力フィールドの初期値を空文字に設定
    }
    this.doChange = this.doChange.bind(this); // 入力変更イベントハンドラーをバインド
    this.doAction = this.doAction.bind(this); // フォーム送信イベントハンドラーをバインド
  }

  // 入力内容が変更された時に state を更新
  doChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      stext: e.target.value // 入力された文字列でstateを更新
    });
  }

  // フォームが送信された時に addMemo アクションをディスパッチ
  doAction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // フォーム送信によるページ遷移を防ぐ
    const action = addMemo(this.state.stext); // 入力されたテキストを使ってaddMemoアクションを作成
    this.props.dispatch(action); // `dispatch` を使って、addMemoアクションをReduxに送信
    this.setState({
      stext: '' // 入力フィールドを空にする
    });
  }

  render() {
    return (
      <div id="AddComponentDIV">
        <form onSubmit={this.doAction}> {/* フォームが送信されるとdoActionを実行 */}
          <input 
            type="text" 
            onChange={this.doChange} // 入力内容が変更されるとdoChangeを実行
            value={this.state.stext} // stateの`stext`を入力フィールドにバインド
            required 
          />
          <input type="submit" value="Add" /> {/* フォーム送信ボタン */}
        </form>
      </div>
    );
  }
}

// `mapStateToProps` の戻り値の型を `RootState` として明示的に定義
const mapStateToProps = (state: RootState) => state; // Reduxストアの状態をPropsとしてコンポーネントに渡す

// `connect` を使用して Redux ストアに接続
const connector = connect(mapStateToProps); // `connect` を使って Redux ストアとコンポーネントを接続

export default connector(AddComponent); // `connector`でラップしたAddComponentをエクスポート
