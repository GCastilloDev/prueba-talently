export const state = () => ({
  listContent: [],
  index: 0,
  comments: []
});

export const getters = {
  getListContent(state) {
    return state.listContent;
  },
  getComments(state) {
    return state.comments;
  }
};

export const mutations = {
  setListContent(state, payload) {
    state.listContent = payload;
  },
  setIndex(state, payload) {
    state.index = payload;
  },
  setComments(state, payload) {
    state.comments = payload;
  },
  setComment(state, payload) {
    state.comments.unshift(payload);
  },
  modifyComments(state, payload) {
    state.comments.splice(payload, 1);
  },
  modifyComment(state, payload) {
    state.comments[payload.index].content = payload.content;
  },
  updateProgressVideo(state, payload) {
    state.listContent[state.index].progress = payload;
  },
  setSession(state, payload) {
    state.auth.loggedIn = payload;
  }
};

export const actions = {
  listContentAdd({ commit }, payload) {
    commit("setListContent", payload);
  },
  updateIndex({ commit }, payload) {
    commit("setIndex", payload);
  },
  updateComments({ commit }, payload) {
    commit("setComments", payload);
  },
  agregateComment({ commit }, payload) {
    commit("setComment", payload);
  },
  deleteComment({ commit }, payload) {
    commit("modifyComments", payload);
  },
  editComment({ commit }, payload) {
    commit("modifyComment", payload);
  },
  updateProgress({ commit }, payload) {
    commit("updateProgressVideo", payload);
  },
  closeSession({ commit }) {
    commit("setSession", false);
  }
};
