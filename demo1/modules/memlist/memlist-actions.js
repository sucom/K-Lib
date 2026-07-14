function viewMemberDetails(memId)
{ $("#editMemberDetails").hide();
  $("#viewMemberDetails").show();

  $("#viewMemberDetails").data("url", "api/member/get-"+memId+".json");
  $("#viewMemberDetails").data("cache", "true");
  klib.render("#viewMemberDetails");
}

function editMemberDetails(memId)
{ $("#viewMemberDetails").hide();
  $("#editMemberDetails").show();

  klib.render("#editMemberDetails", {dataUrl: "api/member/get-"+memId+".json"});
}

function removeMemberDetails(memId)
{
}
