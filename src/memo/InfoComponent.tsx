import React, { Component } from 'react'; // ReactのComponentクラスをインポート
import { connect, ConnectedProps } from 'react-redux'; // Reduxの接続関連の関数をインポート

// Redux ストアの状態の型を定義
interface RootState {
  information: string; // Reduxストアの`information`プロパティの型を定義
}

// コンポーネントの Props 型を定義
interface InfoComponentProps extends ConnectedProps<typeof connector> {} // `connect` から受け取るProps型を定義

class InfoComponent extends Component<InfoComponentProps> {
  render() {
    return (
      <p>{this.props.information}</p>  // Reduxストアの`information`プロパティを表示
    );
  }
}

// `mapStateToProps` の戻り値の型を `RootState` として明示的に定義
const mapStateToProps = (state: RootState) => ({
  information: state.information, // Reduxストアの`information`を`props`としてコンポーネントに渡す
});

// `connect` を使用して Redux ストアに接続
const connector = connect(mapStateToProps); // `mapStateToProps`を使用して、Reduxストアの状態をコンポーネントにマッピング

export default connector(InfoComponent); // `connector`でラップした`InfoComponent`をエクスポート
