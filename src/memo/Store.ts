import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'; // Redux Toolkitの関数をインポート
import { format } from 'date-fns'; // 日付フォーマットのためのdate-fnsをインポート

// 初期データの型定義
interface Memo { // Memoオブジェクトの型を定義
  memo: string; // メモの内容
  createTime: string; // 作成日時
}

interface State { // アプリケーションの状態の型を定義
  data: Memo[]; // メモのリスト
  information: string; // 情報メッセージ
  mode: string; // 現在のモード（デフォルト、検索、削除など）
  fdata: Memo[]; // 検索結果のメモのリスト
}

// 初期データの設定
const initData: State = {
  data: [{ memo: 'default memo', createTime: format(new Date(), 'yyyy/MM/dd HH:mm:ss') }], // デフォルトのメモデータ
  information: 'Please add your memo.', // 初期メッセージ
  mode: 'default', // 初期モードは 'default'
  fdata: [] // 初期の検索結果は空
};

// memoSliceの作成
const memoSlice = createSlice({
  name: 'memo', // スライスの名前を 'memo' に設定
  initialState: initData, // 初期状態を設定
  reducers: { // 以下にアクションを定義
    addMemo(state, action: PayloadAction<string>) { // メモを追加するアクション
      const newMemo: Memo = { // 新しいメモオブジェクトを作成
        memo: action.payload, // ペイロード（送信される値）をメモとして設定
        createTime: format(new Date(), 'yyyy/MM/dd HH:mm:ss') // 現在の日時を作成日時として設定
      };
      state.data.unshift(newMemo); // 新しいメモを先頭に追加
      state.information = 'Add memo successfully!'; // 情報メッセージを更新
      state.mode = 'default'; // モードを 'default' に設定
      state.fdata = []; // 検索結果をリセット
    },
    deleteMemo(state, action: PayloadAction<number>) { // メモを削除するアクション
      state.data.splice(action.payload, 1); // 指定されたインデックスでメモを削除
      state.information = 'Delete memo successfully!'; // 情報メッセージを更新
      state.mode = 'delete'; // モードを 'delete' に設定
      state.fdata = []; // 検索結果をリセット
    },
    searchMemo(state, action: PayloadAction<string>) { // メモを検索するアクション
      const searchText = action.payload; // 検索する文字列を取得
      const filteredData: Memo[] = []; // 検索結果を格納する配列
      let resultInfo = ''; // 結果メッセージを格納する変数

      state.data.forEach((element) => { // メモデータを一つずつ確認
        if (element.memo.indexOf(searchText) >= 0) { // メモが検索文字列を含む場合
          filteredData.push(element); // 結果に追加
        }
      });

      if (searchText === '') { // 検索文字列が空の場合
        resultInfo = 'Clear successfully.'; // 結果メッセージを更新
      } else { // 検索文字列が非空の場合
        resultInfo = filteredData.length
          ? `Find memo successfully. word: ${searchText}` // メモが見つかった場合
          : `Failed to find memo. word: ${searchText}`; // メモが見つからなかった場合
      }

      state.fdata = filteredData; // 検索結果を状態に格納
      state.information = resultInfo; // 結果メッセージを更新
      state.mode = 'search'; // モードを 'search' に設定
    }
  }
});

// Action creatorsの作成
export const { addMemo, deleteMemo, searchMemo } = memoSlice.actions; // アクションのエクスポート

// configureStoreでReduxストアを作成
const store = configureStore({
  reducer: memoSlice.reducer // 作成したスライスのreducerを使用してストアを設定
});

export default store; // ストアをエクスポート
