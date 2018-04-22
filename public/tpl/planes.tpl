<div class="status-bar">

</div>
<canvas id="game-canvas" width="700" height="500"></canvas>

<!-- START modal-dialog -->
<div id="instructionModal" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Instruction</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-success btn-restart-game" data-dismiss="modal">Start new game</button>
      </div>
    </div>
  </div>
</div>
<!-- END modal-dialog -->

<!-- START modal-dialog -->
<div id="resultModal" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">GAME OVER!!!</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div class="modal-body">
        <p></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
        <button type="button" class="btn btn-restart-game btn-success" data-dismiss="modal">Try again</button>
      </div>
    </div>
  </div>
</div>
<!-- END modal-dialog -->